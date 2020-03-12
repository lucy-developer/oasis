package app.ssnc.io.oasis.util

import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

object DateUtil {

    private const val DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss"
    private const val DATE_PATTERN = "yyyy-MM-dd"

    val nowDateTime: String
        get() {
            val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
            return sdf.format(Date())
        }

    val nowDate: String
        get() {
            val sdf = SimpleDateFormat("yyyy-MM-dd")
            return sdf.format(Date())
        }

    val nowTime: String
        get() {
            val sdf = SimpleDateFormat("HH:mm:ss")
            return sdf.format(Date())
        }

    val nowTimeDetail: String
        get() {
            val sdf = SimpleDateFormat("HH:mm:ss.SSS")
            return sdf.format(Date())
        }

    fun getFormatTime(format: String=""): String {
        val ft: String = format
        val sdf = if (!ft.isEmpty()) SimpleDateFormat("format")
        else SimpleDateFormat("yyyyMMddHHmmss")
        return sdf.format(Date())
    }

    fun stringToLocalDateTime(dateString: String="") : LocalDateTime {
        return LocalDateTime.parse(dateString, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
    }

    fun stringToLocalDate(dateString: String="") : LocalDate {
        return LocalDate.parse(dateString, DateTimeFormatter.ofPattern("yyyy-MM-dd"))
    }

    fun formatDateTime(dateTime: LocalDateTime, timePattern: String = DATE_TIME_PATTERN): String {
        return dateTime.format(DateTimeFormatter.ofPattern(timePattern))
    }

    fun formatDate(dateTime: LocalDateTime, timePattern: String = DATE_PATTERN): String {
        return dateTime.format(DateTimeFormatter.ofPattern(timePattern))
    }

    fun getAddDays(date: LocalDate, amount: Long): LocalDate {
        return date.plusDays(amount)
    }

    fun getAddDays(date: LocalDateTime, amount: Long): LocalDateTime {
        return date.plusDays(amount)
    }

    fun getAddMinutes(date: LocalDateTime, amount: Long): LocalDateTime {
        return date.plusMinutes(amount)
    }

    fun compareDate(d1: LocalDateTime, d2: LocalDateTime): Int {
        val c = d2.compareTo(d1);
        if ( c < 0 ) return compareDate(d2, d1)
        if ( d2.year - d1.year <= 1 && (d2.month.value - d1.month.value %12 == 1))
            return Integer.compare(d2.getDayOfMonth(), d1.getDayOfMonth())
        else if (d2.year - d1.year == 0 && d2.month.equals(d1.month))
            return -1
        else
            return 1
    }
}