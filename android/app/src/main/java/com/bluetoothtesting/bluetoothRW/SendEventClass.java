package com.bluetoothtesting.bluetoothRW;

import static com.bluetoothtesting.bluetoothRW.BluetoothRWModule.mReactContext;

import android.util.Log;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;

public class SendEventClass {
    public void sendEvent(String eventName, @Nullable String params) {
        if (mReactContext.hasActiveCatalystInstance()) {
            mReactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }
    public void sendObjectEvent(String eventName, @Nullable WritableMap params) {

        if (mReactContext.hasActiveCatalystInstance()) {
            mReactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }

}
