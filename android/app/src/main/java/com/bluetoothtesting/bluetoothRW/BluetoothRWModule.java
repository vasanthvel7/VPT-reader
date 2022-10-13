package com.bluetoothtesting.bluetoothRW;


import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Intent;
import android.content.ServiceConnection;
import android.text.Editable;
import android.text.Spannable;
import android.text.SpannableStringBuilder;
import android.text.style.ForegroundColorSpan;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;


public class BluetoothRWModule extends ReactContextBaseJavaModule implements  SerialListener {

    private enum Connected { False, Pending, True }

    public static ReactApplicationContext mReactContext;
    private static final String TAG = "MY_APP_DEBUG_TAG";
    private BluetoothRWModule mBluetoothService;
    private BluetoothAdapter mBluetoothAdapter;
    private SerialService service = new SerialService();
    private static final String BT_ENABLED = "bluetoothEnabled";
    private static final String BT_DISABLED = "bluetoothDisabled";
    private static final String CONN_SUCCESS = "connectionSuccess";
    private static final String CONN_FAILED = "connectionFailed";
    private static final String CONN_LOST = "connectionLost";
    private static final String DEVICE_READ = "read";
    private static final String ERROR = "error";
    private Connected connected = Connected.False;
    private boolean hexEnabled = false;
    private String newline = TextUtil.newline_crlf;
    private String WriteData;

    //promise
    private Promise mConnectedPromise;

    BluetoothRWModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
        if (mBluetoothAdapter == null) {
            mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        }

    }




    @Override
    public String getName() {
        return "BluetoothRWModule";
    }


    @ReactMethod
    public void createCalendarEvent(Promise promise) {
        SendEventClass send = new SendEventClass();
        send.sendEvent(DEVICE_READ,"testing");
    }


    @ReactMethod
    public void addListener(String eventName) {
        // Set up any upstream listeners or background tasks as necessary
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Remove upstream listeners, stop unnecessary background tasks
    }

    @ReactMethod
    public void getConnected(String deviceAddress,Promise promise) {
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        BluetoothDevice device = bluetoothAdapter.getRemoteDevice(deviceAddress);
        SerialSocket socket = new SerialSocket(mReactContext, device);
         socket.getConnectResponse(promise);

    }

    @ReactMethod
    public void connect(String deviceAddress,Promise promise) {
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        BluetoothDevice device = bluetoothAdapter.getRemoteDevice(deviceAddress);
        SerialSocket socket = new SerialSocket(mReactContext, device);

        Log.d(TAG, "connect: "+connected);
        if(connected == Connected.False) {
            mConnectedPromise = promise;
            try {

                SendEventClass send = new SendEventClass();
                send.sendEvent(DEVICE_READ, "Connecting....");
                service.connect(socket, promise);


                    connected = Connected.True;

            } catch (Exception e) {
                SendEventClass send = new SendEventClass();
                send.sendEvent(CONN_FAILED, e.getMessage());
                onSerialConnectError(e);
            }
        }
        else {

            if(connected == Connected.True) {

                WritableMap paramsVal = Arguments.createMap();
                paramsVal.putBoolean("status", true);
                promise.resolve(paramsVal);
            }
        }
    }

    @ReactMethod
    private void writeData(String str ,Promise promise) {
        WriteData = str;
        if(connected != Connected.True) {
            status("NotConnected...");
            return;
        }
        try {
            String msg;
            byte[] data;
            if(hexEnabled) {
                StringBuilder sb = new StringBuilder();
                TextUtil.toHexString(sb, TextUtil.fromHexString(str));
                TextUtil.toHexString(sb, newline.getBytes());
                msg = sb.toString();
                data = TextUtil.fromHexString(msg);
            } else {
                msg = str;
                data = (str + newline).getBytes();
            }
            Log.d(TAG, "writeData: "+service);
            service.write(data,str,promise);

        } catch (Exception e) {
            promise.reject(e.getMessage());
            onSerialIoError(e);
        }
    }

    @ReactMethod
    private void disconnect() {
        status("Disconnected...");
        service.disconnect();
    }

    private void status(String str) {

        SendEventClass send = new SendEventClass();
        WritableMap params = Arguments.createMap();
        params.putString("given_msg", WriteData);
        params.putString("response", str);
        send.sendObjectEvent(DEVICE_READ, params);
    }


    @Override
    public void onSerialConnect() {
        status("connected");


    }


    @Override
    public void onSerialConnectError(Exception e) {
        Log.d(TAG, "status: "+mConnectedPromise);
        status("connection failed: " + e.getMessage());
        disconnect();
        WritableMap params = Arguments.createMap();
        params.putBoolean("status", false);
        params.putString("message", e.getMessage());
        mConnectedPromise.resolve(params);
    }

    @Override
    public void onSerialRead(byte[] data) {
        Log.d(TAG, "onSerialRead: "+data);
    }

    @Override
    public void onSerialIoError(Exception e) {
        status("connection lost: " + e.getMessage());
        WritableMap params = Arguments.createMap();
        params.putBoolean("status", false);
        params.putString("message", e.getMessage());
        mConnectedPromise.resolve(params);
        disconnect();

    }


}

