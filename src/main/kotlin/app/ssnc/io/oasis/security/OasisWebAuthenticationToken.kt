package app.ssnc.io.oasis.security

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.GrantedAuthority

class OasisWebAuthenticationToken (val token: String?, principal: Any?, credentials: Any?, authorities: List<GrantedAuthority>) : UsernamePasswordAuthenticationToken(principal, credentials, authorities) {
    constructor(principal: Any?, credentials: Any?, authorities: List<GrantedAuthority>) : this(null, principal, credentials, authorities)
}