package testutils

import (
	"database/sql"
	"errors"
	"fmt"
	"net/url"

	"github.com/gin-contrib/sessions"
	"github.com/go-sql-driver/mysql"
	"github.com/go-testfixtures/testfixtures/v3"
	"github.com/gomiboko/my-circle/db"
	"github.com/stretchr/testify/mock"
	gmysql "gorm.io/driver/mysql"
	"gorm.io/gorm"
)

const (
	User1Email        = "user1@example.com"
	User1Password     = "password"
	User1PasswordHash = "$2a$10$5zIf9lXlK6F7eaMB38uRSes9ecydTeW/xDA53zADvQjrmxA/Q/BsG"
	User1Name         = "user1"

	UnregisteredEmail = "not-exist@example.com"

	FullWidthSpace = "　"
	HalfWidthSpace = " "
)

var ErrTest = errors.New("test error")

var (
	ErrDuplicateEntry = &mysql.MySQLError{
		Number:  uint16(db.ErrDuplicateEntry),
		Message: "db.ErrDuplicateEntry test message",
	}
)

func GetFixtures(fixturesDirPath string) (*testfixtures.Loader, error) {
	sqldb, err := sql.Open("mysql", getDSN())
	if err != nil {
		return nil, err
	}

	return testfixtures.New(
		testfixtures.Database(sqldb),
		testfixtures.Dialect("mysql"),
		testfixtures.Directory(fixturesDirPath),
		testfixtures.DangerousSkipTestDatabaseCheck(),
	)
}

func GetDB() (*gorm.DB, error) {
	return gorm.Open(gmysql.Open(getDSN()), &gorm.Config{})
}

func getDSN() string {
	return fmt.Sprintf("root:root@tcp(test-db:3306)/mycircle?charset=utf8mb3&parseTime=True&loc=%s",
		url.QueryEscape("Asia/Tokyo"))
}

// sessions.sessionのモック
type SessionMock struct {
	mock.Mock
}

func (m *SessionMock) Get(key interface{}) interface{} {
	args := m.Called(key)
	return args.Get(0)
}

func (m *SessionMock) Set(key interface{}, val interface{}) {
	m.Called(key, val)
}

func (m *SessionMock) Delete(key interface{}) {
	m.Called(key)
}

func (m *SessionMock) Clear() {
	m.Called()
}

func (m *SessionMock) AddFlash(value interface{}, vars ...string) {
	m.Called(value, vars)
}

func (m *SessionMock) Flashes(vars ...string) []interface{} {
	args := m.Called(vars)
	return args.Get(0).([]interface{})
}

func (m *SessionMock) Options(opt sessions.Options) {
	m.Called(opt)
}

func (m *SessionMock) Save() error {
	args := m.Called()
	return args.Error(0)
}
