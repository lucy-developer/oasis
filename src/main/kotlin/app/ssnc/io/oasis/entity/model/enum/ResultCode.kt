package app.ssnc.io.oasis.entity.model.enum

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
    SYSTEM_LOCKED(500, "SYSTEM LOCK"),
    /**
     * 请求方法不存在
     */
    NOT_FOUND(404, "NOT FOUND"),
    /**
     * 请求方法不允许
     */
    METHOD_NOT_SUPPORT(405, "NOT ALLOWED"),
    /**
     * 验证失败
     */
    OAUTH_FAILED(401, "Client verification failed"),
    /**
     * 请求出错
     */
    BAD_REQUEST(400, "REQUEST ERROR"),
    /**
     * 参数为空
     */
    PARAMETER_NULL(401, "Parameters are empty"),
    /**
     * 参数为空
     */
    PARAMETER_ERROR(401, "Illegal parameter"),
    /**
     * 操作失败
     */
    SERVER_ERROR(500, "SERVER_ERROR"),
    /**
     * 搜索数据库结果空
     */
    SEARCH_NULL(1010, "No results found"),
    /**
     * oauth2_验证专用代码
     */
    OAUTH_SUCCESS(200, "Verification succeeded"),
    /**
     * 验证失败
     */
    OAUTH_AUTHORIZE_FAILED(401, "Client authentication failed, possibly wrong");


}