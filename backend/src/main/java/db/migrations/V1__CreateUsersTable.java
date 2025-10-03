package db.migrations;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

import java.sql.Statement;

public class V1__CreateUsersTable extends BaseJavaMigration {
    @Override
    public void migrate(Context context) throws Exception {
        try (Statement stmt = context.getConnection().createStatement()) {
            stmt.execute("""
                CREATE TABLE users (
                    id BIGINT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(64) NOT NULL UNIQUE,
                    email VARCHAR(254) NOT NULL UNIQUE,
                    password_hash VARCHAR(100) NOT NULL,
                    role VARCHAR(32) NOT NULL,
                    enabled BOOLEAN NOT NULL DEFAULT TRUE,
                    locked BOOLEAN NOT NULL DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            """);
        }
    }
}
