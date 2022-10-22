package com.bluetoothtesting.bluetoothRW;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.util.Log;

import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;

import java.io.IOException;
import java.security.InvalidParameterException;
import java.util.Arrays;
import java.util.UUID;
import java.util.concurrent.Executors;

class SerialSocket implements Runnable {

    private static final UUID BLUETOOTH_SPP = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    private static final String TAG = "MY_APP_DEBUG_TAG";
    private final BroadcastReceiver disconnectBroadcastReceiver;

    private final Context context;
    private SerialListener listener;
    private final BluetoothDevice device;
    private BluetoothSocket socket;
    private boolean connected;
    private String WriteValue;

    SerialSocket(Context context, BluetoothDevice device) {
        if (context instanceof Activity)
            throw new InvalidParameterException("expected non UI context");
        this.context = context;
        this.device = device;
        disconnectBroadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (listener != null)
                    listener.onSerialIoError(new IOException("background disconnect"));
                disconnect(); // disconnect now, else would be queued until UI re-attached
            }
        };
    }

    String getName() {
        return device.getAddress();
    }

    /**
     * connect-success and most connect-errors are returned asynchronously to listener
     */
    void connect(SerialListener listener) throws IOException {
        try {
            this.listener = listener;
            context.registerReceiver(disconnectBroadcastReceiver, new IntentFilter(Constants.INTENT_ACTION_DISCONNECT));
            Executors.newSingleThreadExecutor().submit(this);
            Log.d(TAG, "connect:Final: Connected");
        } catch (Exception e) {
            Log.d(TAG, "connect:Final: "+e.getMessage());
        }

    }

    void disconnect() {
        listener = null; // ignore remaining data and errors
        // connected = false; // run loop will reset connected
        if (socket != null) {
            try {
                socket.close();
            } catch (Exception ignored) {
            }
            socket = null;
        }
        try {
            context.unregisterReceiver(disconnectBroadcastReceiver);
        } catch (Exception ignored) {
        }
    }


    void getConnectResponse (Promise promise) {
        Log.d(TAG, "getConnectResponse: "+socket);
        if(socket != null)
        {
            WritableMap params = Arguments.createMap();
            params.putBoolean("status", socket.isConnected());
            promise.resolve(params);

        }
        else {
            WritableMap params = Arguments.createMap();
            params.putBoolean("status", false);
            promise.resolve(params);
        }


    }

    void write(byte[] data, String msg, Promise promise) throws IOException {
        Log.d(TAG, "write:socket "+socket);
        if (socket != null)
        {
            Log.d(TAG, "write:socket.isConnected() "+socket.isConnected());
            try {
                if (socket.isConnected()) {
                    try {
                        WriteValue = msg;
                        socket.getOutputStream().write(data);
                        WritableMap params = Arguments.createMap();
                        params.putString("given_msg", msg);
                        params.putBoolean("status", true);
                        params.putString("response", "Data Writed Successfully....");
                        promise.resolve(params);
                    } catch (Exception e) {
                        WritableMap params = Arguments.createMap();
                        params.putString("given_msg", msg);
                        params.putBoolean("status", false);
                        params.putString("response", e.getMessage());
                        promise.resolve(params);
                    }
                }
            } catch (Exception e) {
                WritableMap params = Arguments.createMap();
                params.putString("given_msg", msg);
                params.putBoolean("status", false);
                params.putString("response", e.getMessage());
                promise.resolve(params);
            }
        }
            else {
                WritableMap params = Arguments.createMap();
                params.putString("given_msg", msg);
                params.putBoolean("status", false);
                params.putString("response", "Data is not Writed Successfully....");
                promise.resolve(params);


            }



//        socket.getOutputStream().write(data);
    }



    @SuppressLint("MissingPermission")
    @Override
    public void run() { // connect & read
        try {
            socket = device.createRfcommSocketToServiceRecord(BLUETOOTH_SPP);
            socket.connect();


            if(listener != null) {
                listener.onSerialConnect();
                SendEventClass send = new SendEventClass();
                WritableMap params = Arguments.createMap();
                params.putBoolean("connected", true);
                send.sendObjectEvent("connectionSuccess", params);
            }
        } catch (Exception e) {
            Log.d(TAG, "run: "+e.getMessage());
            SendEventClass send = new SendEventClass();
            WritableMap params = Arguments.createMap();
            params.putBoolean("connected", false);
            send.sendObjectEvent("connectionFailed", params);
            if(listener != null)
                listener.onSerialConnectError(e);
            try {
                socket.close();
            } catch (Exception ignored) {
            }
            socket = null;
            return;
        }
        connected = true;
        try {
            byte[] buffer = new byte[1024];
            int len;
            //noinspection InfiniteLoopStatement
            while (true) {
                len = socket.getInputStream().read(buffer);
                byte[] data = Arrays.copyOf(buffer, len);
                DeviceRead bluetoothRWModule = new DeviceRead();

                bluetoothRWModule.onSerialRead(data,WriteValue);

                if(listener != null)
                    listener.onSerialRead(data);
            }
        } catch (Exception e) {
            connected = false;
            if (listener != null)
                listener.onSerialIoError(e);
            try {
                socket.close();
            } catch (Exception ignored) {
            }
            socket = null;
        }
    }

}
