package com.bluetoothtesting.bluetoothRW;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

public class DeviceRead {
    private boolean hexEnabled = false;
    private String newline = TextUtil.newline_crlf;
    private void receive(byte[] data,String str) {
        SendEventClass send = new SendEventClass();

        if(hexEnabled) {
            WritableMap params = Arguments.createMap();
            params.putString("given_msg", str);
            params.putString("params", TextUtil.toHexString(data));
            send.sendObjectEvent("read", params);
        } else {
            String msg = new String(data);
            if(newline.equals(TextUtil.newline_crlf) && msg.length() > 0) {
                msg = msg.replace(TextUtil.newline_crlf, TextUtil.newline_lf);
            }
            WritableMap params = Arguments.createMap();
            params.putString("given_msg", str);
            params.putString("response",  String.valueOf(TextUtil.toCaretString(msg, newline.length() != 0)));
            send.sendObjectEvent("read", params);
        }
    }

    public void onSerialRead(byte[] data,String msg) {
        receive(data,msg);
    }
}
