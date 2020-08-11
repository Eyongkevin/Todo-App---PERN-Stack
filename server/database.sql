CREATE TYPE mood AS ENUM ('Stuck','In Progress','Done','Task'); 

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    progress NUMERIC(100),
    status mood NOT NULL
    
);
