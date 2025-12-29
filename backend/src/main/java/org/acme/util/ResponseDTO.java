package org.acme.util;


public class ResponseDTO<T> {
    public String status;
    public String message;
    public T data;

    public static <T> ResponseDTO<T> ok(String msg, T data) {
        ResponseDTO<T> dto=new ResponseDTO<>();
        dto.status="OK";
        dto.message=msg;
        dto.data=data;
        return dto;
    }

    public static <T> ResponseDTO<T> error(String msg) {
        ResponseDTO<T> dto=new ResponseDTO<>();
        dto.status="ERROR";
        dto.message=msg;
        return dto;
    }
}
