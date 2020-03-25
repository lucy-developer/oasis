package app.ssnc.io.oasis.entity.model.enum

/**
 * @author alice on 2018/2/6 0006.
 *
 * @since 1.0
 * @version 1.0
 */
enum class ResultCode(val code: Int, val message: String = "") {
    /**
     * 操作成功
     */
    SUCCESS(0, "SUCCESS"),
    /**
     * 操作失败
     */
    FAILED(1, "FAILED"),
    /**
     * 操作失败
     */
    SYSTEM_LOCKED(500, "SYSTEM_LOCKED"),
    /**
     * 请求方法不存在
     */
    NOT_FOUND(404, "NOT_FOUND"),
    /**
     * 请求方法不允许
     */
    METHOD_NOT_SUPPORT(405, "METHOD_NOT_SUPPORT"),
    /**
     * 验证失败
     */
    OAUTH_FAILED(401, "OAUTH_FAILED"),
    /**
     * 请求出错
     */
    BAD_REQUEST(400, "BAD_REQUEST"),
    /**
     * 参数为空
     */
    PARAMETER_NULL(401, "PARAMETER_NULL"),
    /**
     * 参数为空
     */
    PARAMETER_ERROR(401, "PARAMETER_ERROR"),
    /**
     * 操作失败
     */
    SERVER_ERROR(500, "SERVER_ERROR"),
    /**
     * 搜索数据库结果空
     */
    SEARCH_NULL(1010, "SEARCH_NULL"),
    /**
     * oauth2_验证专用代码
     */
    OAUTH_SUCCESS(200, "OAUTH_SUCCESS"),
    /**
     * 验证失败
     */
    OAUTH_AUTHORIZE_FAILED(401, "OAUTH_AUTHORIZE_FAILED client_id/client_secret。");


}