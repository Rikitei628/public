# public
```sql
CREATE TABLE reservation(  
    id SERIAL NOT NULL primary key,
    create_time TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ,
    update_time TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ,
    username varchar(255),
    tell varchar(255),
    reservation_time TIMESTAMP ,
    menu varchar(2000)
);
```