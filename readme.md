#NB!!! Selleks et kõik töötaks kõigil samamoodi!!!
#PROJECT SETUP

##Projekti kaustas käsureal:
###_npm install_


##installi endale docker (docker installi arvutisse)
##jooksuta powershellis v kusagil CMD-s:
###_docker run --name wad21-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres_


##Pärast seda sisesta andmebaasi järgnev käsk:
```
create table if not exists posts
(
    id      serial
        constraint posts_pk
            primary key,
    title   varchar not null,
    body    varchar not null,
    urllink varchar not null,
    likes   integer default 0
);

alter table posts
    owner to postgres;


```

##Käsureal:
###_npx nodemon app_  (see jooksuta projekti kaustas)
