package validations

import (
	"regexp"

	"github.com/go-playground/validator/v10"
)

func NotOnlyWhitespace(fl validator.FieldLevel) bool {
	val, ok := fl.Field().Interface().(string)
	if ok {
		// 半角スペース、または全角スペースのみ
		r := regexp.MustCompile("^[ 　]*$")
		return !r.MatchString(val)
	} else {
		return false
	}
}

func Password(fl validator.FieldLevel) bool {
	val, ok := fl.Field().Interface().(string)
	if ok {
		r := regexp.MustCompile("^[a-zA-Z0-9!@#$%^&*()-_=+[\\]{}\\\\|~;:'\",.<>/?`]*$")
		return r.MatchString(val)
	} else {
		return false
	}
}
