package app.ssnc.io.oasis.util

import kotlin.reflect.KProperty1

object Extension {
    inline fun <reified T : Any> T.toStringBuilder(vararg properties: KProperty1<T, Any?>): String =
        properties.joinToString(prefix = "${T::class.simpleName}(", postfix = ")") {
            "${it.name}=${it.get(this)}"
        }

    inline fun <reified T : Any> T.equalsBuilder(
        other: Any?,
        vararg properties: KProperty1<T, Any?>
    ) = when {
        this === other -> true
        this.javaClass != other?.javaClass -> false
        other !is T -> false
        else -> properties.all {
            it.get(other) == it.get(this)
        }
    }

}