package app.ssnc.io.oasis.entity.model.enum

enum class EmployeePosition(val type: String, val desc: String) {
    CEO("CEO", "대표"),
    DIRECTOR("Director", "본부장"),
    TEAM_LEADER("Team Leader", "팀장"),
    CONDUCTOR("Conductor", "차장"),
    MANAGER("Manager", "매니저"),
    INTERN("Intern", "인턴"),
    ETC("ETC", "기타")
}

enum class Gender(val type: String, val desc: String) {
    U("UNKNOWN", "전체"),
    M("MALE", "남성"),
    F("FEMALE", "여성")
}

enum class EmployeeStatus(val type: String, val desc: String) {
    ING("ING", "재직"),
    OUT("OUT", "퇴사"),
    STOP("STOP", "휴직"),
    REING("REING", "복직")
}

enum class UserRole {
    ROLE_ADMIN,
    ROLE_USER,
    ROLE_SALES,
    ROLE_ENGINEER,
    ROLE_DEV;
}