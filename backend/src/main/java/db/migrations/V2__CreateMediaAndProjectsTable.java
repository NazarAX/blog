package db.migrations;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;


public class V2__CreateMediaAndProjectsTable extends BaseJavaMigration {

    @Override
    public void migrate(Context context) {
        JdbcTemplate db = new JdbcTemplate(new SingleConnectionDataSource(context.getConnection(), true));
        db.execute("CREATE TABLE media (\n" +
                "    id BIGINT AUTO_INCREMENT PRIMARY KEY,\n" +
                "    filename VARCHAR(255) NOT NULL,\n" +
                "    url VARCHAR(500) NOT NULL,\n" +
                "    path VARCHAR(500) NOT NULL,\n" +
                "    content_type VARCHAR(100) NOT NULL,\n" +
                "    size BIGINT NOT NULL,\n" +
                "    alt_text VARCHAR(255),\n" +
                "    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n" +
                ");\n");

        db.execute("CREATE TABLE project (\n" +
                "    id BIGINT AUTO_INCREMENT PRIMARY KEY,\n" +
                "    name VARCHAR(120) NOT NULL,\n" +
                "    description VARCHAR(120) NOT NULL,\n" +
                "    slug VARCHAR(120) NOT NULL UNIQUE,\n" +
                "    cover_id BIGINT,\n" +
                "    html LONGTEXT, -- @Lob maps to LONGTEXT (MySQL)\n" +
                "    published BOOLEAN NOT NULL DEFAULT FALSE,\n" +
                "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n" +
                "    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n" +
                "    \n" +
                "    CONSTRAINT fk_project_cover FOREIGN KEY (cover_id) REFERENCES media(id)\n" +
                ");");
    }
}