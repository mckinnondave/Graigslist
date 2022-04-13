INSERT INTO users (id,name,email,password,is_admin,avatar_url,city,province,street_address,post_code,country,location_latitude,location_logitude)
VALUES
    ('1', 'Carly Khomich', 'ckhomich0@telegraph.co.uk', 'f9AaTV3', 'true', 'https://robohash.org/autmodiconsequatur.png?size=500x500&set=set1', 'BÃ©cancour', 'QuÃ©bec', '138 Welch Hill', 'G9H', 'Canada', '46.4005111', '-72.2690204'),
    ('2', 'Loella Cullinan', 'lcullinan1@economist.com', 'NmCUhR', 'true', 'https://robohash.org/aliquamaliasitaque.png?size=500x500&set=set1', 'Sherwood Park', 'Alberta', '90895 Messerschmidt Terrace', 'T8A', 'Canada', '53.5412083', '-113.2957365'),
    ('3', 'Monty Czaple', 'mczaple2@w3.org', 'sYwxQ2', 'true', 'https://robohash.org/sitrerumtempore.png?size=500x500&set=set1', 'Fox Creek', 'Alberta', '9 Bartelt Plaza', 'E4B', 'Canada', '54.40007', '-116.80238'),
    ('4', 'Sileas Barkas', 'sbarkas3@facebook.com', 'b5ZpKAx0', 'true', 'https://robohash.org/estcumquetotam.png?size=500x500&set=set1', 'Little Current', 'Ontario', '56 Quincy Lane', 'J6A', 'Canada', '45.97927', '-81.9248'),
    ('5', 'Mira Merck', 'mmerck4@twitpic.com', 'URWq0Aa8U', 'true', 'https://robohash.org/culpanamveritatis.png?size=500x500&set=set1', 'Boisbriand', 'QuÃ©bec', '6 Bunker Hill Place', 'J7G', 'Canada', '45.6181396', '-73.8394482'),
    ('6', 'Tawsha Gerardi', 'tgerardi5@army.mil', 'q0JrGmA', 'true', 'https://robohash.org/inaliquamet.png?size=500x500&set=set1', 'Midland', 'Ontario', '0890 Village Crossing', 'L4R', 'Canada', '44.7515479', '-79.8779499'),
    ('7', 'Morris Cafferty', 'mcafferty6@163.com', 'RsLJu5', 'true', 'https://robohash.org/eumetatque.png?size=500x500&set=set1', 'Lumby', 'British Columbia', '77636 6th Avenue', 'P7L', 'Canada', '50.24979', '-118.96904'),
    ('8', 'Norah McGirl', 'nmcgirl7@upenn.edu', 'YYa0sT7', 'true', 'https://robohash.org/accusantiumessenihil.png?size=500x500&set=set1', 'Antigonish', 'Nova Scotia', '22182 Goodland Circle', 'B2G', 'Canada', '45.6243985', '-62.002631'),
    ('9', 'Barbi Flemming', 'bflemming8@macromedia.com', '9GA2gpbEJvHk', 'true', 'https://robohash.org/exaccusamusaliquam.png?size=500x500&set=set1', 'Sainte-Anne-de-Bellevue', 'Quebec', '62 Lukken Center', 'H9X', 'Canada', '45.4032761', '-73.9503607'),
    ('10', 'Karola Billings', 'kbillings9@soundcloud.com', '59L7yAD8vyoO', 'true', 'https://robohash.org/omnissuntoccaecati.png?size=500x500&set=set1', 'Thessalon', 'Ontario', '59934 Drewry Junction', 'P0T', 'Canada', '46.25006', '-83.5666');

ALTER SEQUENCE users_id_seq RESTART WITH 11;
