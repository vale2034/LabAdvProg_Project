-- Creazione delle sequenze
CREATE SEQUENCE IF NOT EXISTS cart_items_id_seq;
CREATE SEQUENCE IF NOT EXISTS orders_id_seq;
CREATE SEQUENCE IF NOT EXISTS prodotti_id_seq;
CREATE SEQUENCE IF NOT EXISTS users_id_seq;



CREATE TABLE IF NOT EXISTS public.prodotti
(
    id integer NOT NULL DEFAULT nextval('prodotti_id_seq'::regclass),
    nome character varying(255) COLLATE pg_catalog."default" NOT NULL,
    descrizione text COLLATE pg_catalog."default",
    prezzo numeric(10,2) NOT NULL,
    disponibile boolean NOT NULL DEFAULT true,
    CONSTRAINT prodotti_pkey PRIMARY KEY (id)
);





CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    password_hash character varying COLLATE pg_catalog."default",
    is_admin boolean,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);







-- Table: public.cart_items
-- DROP TABLE IF EXISTS public.cart_items;

CREATE TABLE IF NOT EXISTS public.cart_items
(
    id integer NOT NULL DEFAULT nextval('cart_items_id_seq'::regclass),
    user_id integer,
    product_id integer,
    quantity integer,
    CONSTRAINT cart_items_pkey PRIMARY KEY (id),
    CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES public.prodotti (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT cart_items_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE IF NOT EXISTS public.orders
(
    id integer NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
    user_id integer,
    total_price double precision,
    status character varying COLLATE pg_catalog."default",
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);



-- Inserimento dati di esempio per la tabella 'users'
INSERT INTO public.users (username, email, password_hash, is_admin)
VALUES
    ('testuser', 'testuser@example.com', 'scrypt:32768:8:1$JtLLxfFQDbn3OWzP$ce61271bd7110e05b8598e28646075179ecf5db47b5d5413a1e6b78173d99b127f16f3b446b408566426b44ebabcc8e2f01268d905a9ed2a2c5bd2c34f14b5f8', FALSE),
    ('2034421', 'valerio.botte882@gmail.com', 'scrypt:32768:8:1$k9VbISwbssGVS5P8$ad9d14849231f63b7a619da40a0e294f89f69773ff03f7370626f367b0ea48071b6d78ce8e663479f8a8edb8bad3bae309144cff139eb2a9d9177a7cf1638d15', FALSE);



-- Inserimento dati di esempio per la tabella 'prodotti'
INSERT INTO public.prodotti (nome, descrizione, prezzo, disponibile)
VALUES
    ('Giacca Eco - Colore Bianco', 'Questa giacca bianca è fatta con materiali sostenibili, offrendo eleganza e protezione ambientale.', 59.99, TRUE),
    ('Giacca Eco - Colore Crema', 'La giacca color crema è realizzata con materiali eco-compatibili, ideale per chi cerca stile e rispetto per l''ambiente.', 79.99, TRUE),
    ('Camicia - Colore Blu Notte', 'La camicia blu notte è confezionata con materiali ecologici, perfetta per un look elegante e sostenibile.', 45.99, TRUE),
    ('Camicia jeans organico', 'Questa camicia in jeans è realizzata con cotone organico, unendo robustezza e sostenibilità.', 79.99, TRUE),
    ('Camicia cotone organico - Colore Ruggine', 'La camicia color ruggine in cotone organico è ideale per un look raffinato e rispettoso dell''ambiente.', 129.99, TRUE),
    ('BioChino-Colore Oliva', 'I BioChino color oliva sono fatti con materiali eco-friendly, combinando stile e sostenibilità.', 99.99, TRUE),
    ('Bio T-shirt - Colore Sabbia', 'La Bio T-shirt color sabbia è realizzata con tessuti biologici, garantendo morbidezza e sostenibilità.', 29.99, TRUE),
    ('Camicia Bio - Colore Sabbia', 'Questa camicia color sabbia è confezionata con materiali biologici, per uno stile elegante e sostenibile.', 39.99, TRUE),
    ('Felpa con cappuccio cotone organico - Colore blu notte', 'La felpa blu notte con cappuccio è realizzata in cotone organico, offrendo calore e comfort rispettando l''ambiente.', 99.99, TRUE),
    ('T-Shirt Bio - Colore Verde Militare', 'La T-Shirt verde militare è fatta con materiali biologici, assicurando morbidezza e sostenibilità.', 19.99, TRUE),
    ('Cappellino Eco - Bianco', 'Questo cappellino bianco è realizzato con materiali ecologici, perfetto per un look casual e responsabile.', 15.99, TRUE),
    ('Polo ricamata - Colore Nero', 'La nostra polo nera, finemente ricamata, è realizzata con tessuti eco-sostenibili, perfetta per un look raffinato e responsabile.', 69.99, TRUE),
    ('Smanicata Eco - Colore atracite', 'La smanicata eco antracite è realizzata con materiali riciclati, assicurando un impatto minimo sull''ambiente senza rinunciare allo stile.', 29.99, TRUE),
    ('Camica Classica Eco Tessuto - Colore Blu a righe', 'Questa camicia classica blu a righe è confezionata con tessuti eco-friendly, combinando eleganza e sostenibilità.', 39.99, TRUE),
    ('Girocollo cotone organico - Colore Rosso', 'Il girocollo rosso in cotone organico offre comfort e traspirabilità, realizzato nel rispetto dell''ambiente.', 49.99, FALSE),
    ('Zaino Organico - Colore atracite', 'Il girocollo rosso in cotone organico offre comfort e traspirabilità, realizzato nel rispetto dell''ambiente.', 25.99, TRUE),
    ('Giacca invernale Piuma solidale - Colore atracite', 'Questa giacca invernale antracite, imbottita con piuma solidale, è ideale per mantenerti caldo proteggendo il nostro pianeta.', 349.99, TRUE),
    ('Smanicato Tecnico - Colore Atracite', 'Lo smanicato tecnico antracite è progettato con materiali eco-compatibili, perfetto per chi cerca performance senza compromettere l''ambiente.', 120.00, TRUE),
    ('BioChino - Colore Sabbia', 'I BioChino color sabbia sono confezionati con tessuti sostenibili, unendo eleganza e sostenibilità in un unico capo.', 99.99, TRUE),
    ('BioChino- Colore Nero', 'I nostri BioChino neri sono realizzati con materiali ecologici, garantendo comfort e stile rispettando l''ambiente.', 99.99, TRUE);


-- Inserimento dati di esempio per la tabella 'cart_items'
INSERT INTO public.cart_items (user_id, product_id, quantity) VALUES
    (1, 1, 10), 
    (2, 2, 5);

-- Inserimento dati di esempio per la tabella 'orders'
INSERT INTO public.orders (user_id, total_price, status) VALUES
    (1, 150.00, 'Pending'), 
    (2, 250.00, 'Shipped');


