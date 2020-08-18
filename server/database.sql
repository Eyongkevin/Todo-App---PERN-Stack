CREATE TYPE mood AS ENUM ('Stuck','Do Today','In Progress','Done','Task'); 

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    status mood NOT NULL, 
    done_timestamp TIMESTAMP
);
CREATE TABLE todochecklist(
    todoCheckList_id SERIAL PRIMARY KEY,
    task VARCHAR(255),
    done BOOLEAN,
    todo_id int4 DEFAULT 0,

    UNIQUE (todo_id),
    FOREIGN KEY (todo_id) REFERENCES todo(todo_id)
)