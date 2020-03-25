package app.ssnc.io.oasis.entity.response

import app.ssnc.io.oasis.entity.model.enum.ResultCode

/**
 * @author alice on 2018/2/6 0006.
 *
 * @since 1.0
 * @version 1.0
 */
object ResultResponse {
    private const val apiVersion = "1.0"
    private var code: Int = 0
    private var message: String? = null
    private var data: Any? = null

    /**
     * 请求成功
     *
     * @return {
     * data:'',
     * message:'操作成功!',
     * code:'0'
     * }
     */
    fun success(): ResultResponse {
        return success(null)
    }

    /**
     * 请求成功(包含data数据)
     *
     * @param data 请求成功返回的数据
     * @return {
     * data:data,
     * message:'操作成功!',
     * code:'0'
     * }
     */
    fun success(data :Any?): ResultResponse {
        val result = ResultResponse
        result.code = ResultCode.SUCCESS.code
        result.message = ResultCode.SUCCESS.message
        result.data = data
        return result
    }

    /**
     * 请求失败
     *
     * @return {
     * message:'操作失败!',
     * message:'1'
     * }
     */
    fun failed(): ResultResponse {
        return failed(ResultCode.FAILED)
    }

    /**
     * 请求失败
     *
     * @param code 错误代码
     * @return {
     * message:'操作失败!',
     * code:'1'
     * }
     */
    fun failed(code: ResultCode): ResultResponse {
        val result = ResultResponse
        result.code = code.code
        result.message = code.message
        return result
    }

    /**
     * 自定义请求返回结果
     *
     * @param msg 自定义错误信息
     * @return {
     * message:msg,
     * code:code
     * }
     */
    fun <P> init(code: Int, msg: String): ResultResponse {
        return init<P>(code, msg, null)
    }

    /**
     * 自定义请求返回结果
     *
     * @param msg 自定义错误信息
     * @return {
     * message:msg,
     * code:code
     * }
     */
    fun <P> init(code: Int, msg: String, data: P?): ResultResponse {
        val result = ResultResponse
        result.code = code
        result.message = msg
        result.data = data
        return result
    }

    /**
     * 自定义请求返回结果
     *
     * @param resultCode oauth2代码
     * @return {
     * message:msg,
     * status:status
     * }
     */
    fun <P> oauth2(resultCode: ResultCode, data: P): ResultResponse {
        val result = ResultResponse
        result.code = resultCode.code
        result.message = resultCode.message
        result.data = data
        return result
    }

    /**
     * 转换成string返回
     *
     * @param msg 自定义错误信息
     * @return {
     * message:msg,
     * status:status
     * }
     */
    fun <P> returnStr(code: Int, msg: String, data: P): String {
        return "{" +
            "\"code\":\"" + code +
            "\", \"message\":\"" + msg +
            "\", \"data\":\"" + data +
            "\"}"
    }

    fun getApiVersion(): String {
        return apiVersion
    }

    fun getCode(): Int {
        return code
    }

    fun setCode(code: Int) {
        this.code = code
    }

    fun getMessage(): String? {
        return message
    }

    fun setMessage(message: String) {
        this.message = message
    }

    fun getData(): Any? {
        return data
    }
}