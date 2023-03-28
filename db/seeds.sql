INSERT INTO department (name)
VALUES ("Technical Development"),
       ("Control Systems"),
       ("Public Relations"),
       ("IT"),
       ("Finance"),
       ("logistics");


INSERT INTO role (title, salary, department_id)
VALUES ("Public Relations Spec.", 100000, 3),
        ("Public Relations Manager", 150000, 3),
        ("Logistics Tech.", 120000, 6),
        ("IT", 120000, 4),
        ("Finance Spec", 150000, 5),
        ("Finance Manager", 200000, 5),
        (inde 150000, 6);



INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES  ("Loki",  "Laufeyjarson" , 2,5),
        ("Thor", "Odinson", 2, 1),
        ("Var", "",5, 5),
        ("The", "Hulk", 1, 1),
        ("Tony", "Stark" , 1, NULL),
        ("Bruce", "Wayne", 1, 5),
        ("Amy", "Bendix" , 5, 5),
        ("Leland", "Owlsley" , 6, 5),
        ("Natasha", "Romanoff" , 5, 7),
        ("Ultron", "" , 1, 5),
        ("Loelei" ,"", 4, 5);