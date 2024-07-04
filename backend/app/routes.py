
from flask import request, jsonify, Blueprint
from app.models import Product
from app.models import User
from app.models import CartItem
from app.models import Order
from config import SessionLocal
from werkzeug.security import generate_password_hash, check_password_hash
from contextlib import contextmanager

@contextmanager
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Crea un Blueprint per le rotte API
api = Blueprint('api', __name__)

# --------------------------------------------- AUTENTICAZIONE -------------------------------------- #

# Registrazione degli utenti
@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    print(username, email, password)


    if not username or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    db = SessionLocal()
    user = User(username=username, email=email)
    user.set_password(password)
    db.add(user)
    db.commit()
    db.close()

    return jsonify({'message': 'User registered successfully'}), 201

# Login degli utenti
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    db = SessionLocal()
    user = db.query(User).filter_by(username=username).first()

    if user is None or not user.check_password(password):
        return jsonify({'error': 'Invalid username or password'}), 401
    
    user_id = user.id  # Ottieni l'ID dell'utente

    db.close()
    # Nota: qui dovresti implementare la generazione di un token di autenticazione
    return jsonify({'message': 'Login successful', 'userId': user_id}), 200



# -------------------------------------------- GESTIONE PRODOTTI ---------------------------------------------- #



# Definisci la rotta API per ottenere tutti i prodotti
@api.route('/products')
def get_all_products():
    try:
        # Ottieni tutti i prodotti dal database
        db = SessionLocal()
        products = db.query(Product).all()
        db.close()

        # Estrai solo i dati rilevanti e restituiscili come JSON
        products_data = []
        for product in products:
            product_data = {
                'id': product.id,
                'nome': product.nome,
                'descrizione': product.descrizione,
                'prezzo': product.prezzo,
                'disponibile': product.disponibile
            }
            products_data.append(product_data)

        # Restituisci i dati dei prodotti in formato JSON
        return jsonify(products_data)
    except Exception as e:
        # Stampa l'errore per il debug
        print(e)
        # Gestisci eventuali errori
        return jsonify({'error': 'Internal Server Error'}), 500
    

#---- SINGOLO PRODOTTO ----#
@api.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    db = SessionLocal()
    product = db.query(Product).filter_by(id=product_id).first()
    db.close()
    if product is None:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify({
        'id': product.id,
        'nome': product.nome,
        'descrizione': product.descrizione,
        'prezzo': product.prezzo,
        'disponibile': product.disponibile
    }), 200





@api.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    with get_session() as db:
        product = Product(**data)
        db.add(product)
        db.commit()
        return jsonify({
            'id': product.id,
            'nome': product.nome,
            'descrizione': product.descrizione,
            'prezzo': product.prezzo,
            'disponibile': product.disponibile
        }), 201
    

    
@api.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    db = SessionLocal()
    with get_session() as db:
        product = db.query(Product).filter_by(id=product_id).first()
        if product is None:
            return jsonify({'error': 'Product not found'}), 404

    for key, value in data.items():
        setattr(product, key, value)

    db.commit()
    db.close()
    return jsonify({
        'id': product.id,
        'nome': product.nome,
        'descrizione': product.descrizione,
        'prezzo': product.prezzo,
        'disponibile': product.disponibile
    }), 200

@api.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    db = SessionLocal()
    with get_session() as db:
        product = db.query(Product).filter_by(id=product_id).first()
        if product is None:
            return jsonify({'error': 'Product not found'}), 404

    db.delete(product)
    db.commit()
    db.close()
    return jsonify({'message': 'Product deleted successfully'}), 200


# -------------------------------------------- Gestione del Carrello --------------------------------- #

@api.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    user_id = data.get('userId')  # Modifica il nome del campo a 'userId'
    product_id = data.get('productId')  # Modifica il nome del campo a 'productId'
    quantity = data.get('quantity')

    if not user_id or not product_id or not quantity:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        with get_session() as db:
            # Controlla se il prodotto esiste nel database
            product = db.query(Product).filter_by(id=product_id).first()
            if not product:
                return jsonify({'error': 'Product not found'}), 404

            # Crea un nuovo oggetto CartItem nel database
            cart_item = CartItem(user_id=user_id, product_id=product_id, quantity=quantity)
            db.add(cart_item)
            db.commit()

            # Costruisci il payload di risposta con le informazioni del prodotto
            cart_item_data = {
                'id': cart_item.id,
                'user_id': cart_item.user_id,
                'product_id': cart_item.product_id,
                'quantity': cart_item.quantity,
                'nome': product.nome,
                'descrizione': product.descrizione,
                'prezzo': product.prezzo,
            }

        return jsonify(cart_item_data), 201


    except Exception as e:
        print(f"Error adding to cart: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500





@api.route('/cart/<int:user_id>', methods=['GET'])
def get_cart(user_id):
    try:
        with get_session() as db:
            cart_items = db.query(CartItem).filter_by(user_id=user_id).all()
            grouped_items = {}

            for item in cart_items:
                product_id = item.product_id
                if product_id not in grouped_items:
                    grouped_items[product_id] = {
                        'id': item.id,
                        'user_id': item.user_id,
                        'product_id': item.product_id,
                        'quantity': item.quantity,
                        'nome': item.product.nome,
                        'descrizione': item.product.descrizione,
                        'prezzo': item.product.prezzo,
                    }
                else:
                    grouped_items[product_id]['quantity'] += item.quantity

            items = list(grouped_items.values())

        return jsonify(items), 200

    except Exception as e:
        print(f"Error fetching cart for user {user_id}: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500


@api.route('/cart/<int:user_id>/<int:item_id>', methods=['DELETE'])
def remove_from_cart(user_id, item_id):
    with get_session() as db:
        cart_item = db.query(CartItem).filter_by(user_id=user_id, id=item_id).first()
        if cart_item is None:
            return jsonify({'error': 'Item not found'}), 404
        db.delete(cart_item)
        db.commit()
    return jsonify({'message': 'Item removed from cart'}), 200




@api.route('/cart/<int:user_id>', methods=['DELETE'])
def clear_cart(user_id):
    with get_session() as db:
        cart_items = db.query(CartItem).filter_by(user_id=user_id).all()
        if not cart_items:
            return jsonify({'message': 'Cart is already empty'}), 200
        
        for cart_item in cart_items:
            db.delete(cart_item)
        db.commit()
    
    return jsonify({'message': 'All items removed from cart'}), 200




@api.route('/cart/<int:user_id>/<int:product_id>', methods=['PUT'])
def update_cart_item(user_id, product_id):
    data = request.get_json()
    quantity = data.get('quantity')

    if not quantity:
        return jsonify({'error': 'Missing required field "quantity"'}), 400

    with get_session() as db:
        cart_item = db.query(CartItem).filter_by(user_id=user_id, product_id=product_id).first()
        if cart_item is None:
            return jsonify({'error': 'Cart item not found'}), 404

        cart_item.quantity = quantity
        db.commit()
        cart_item_dict = {
            'id': cart_item.id,
            'user_id': cart_item.user_id,
            'product_id': cart_item.product_id,
            'quantity': cart_item.quantity
        }

    return jsonify(cart_item_dict), 200


# ---------------------------------------------- Gestione degli Ordini ------------------------------------

@api.route('/order', methods=['POST'])
def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    total_price = data.get('total_price')

    if not user_id or not total_price:
        return jsonify({'error': 'Missing required fields'}), 400

    with get_session() as db:
        order = Order(user_id=user_id, total_price=total_price, status='pending')
        db.add(order)
        db.commit()

        order_dict = {
            'id': order.id,
            'user_id': order.user_id,
            'total_price': order.total_price,
            'status': order.status
        }

        return jsonify(order_dict), 201

@api.route('/orders/<int:user_id>', methods=['GET'])
def get_orders(user_id):
    with get_session() as db:
        orders = db.query(Order).filter_by(user_id=user_id).all()

        orders_list = [{
            'id': order.id,
            'user_id': order.user_id,
            'total_price': order.total_price,
            'status': order.status
        } for order in orders]

        return jsonify(orders_list), 200
    
@api.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    with get_session() as db:
        # Cerca l'ordine nel database per eliminarlo
        order = db.query(Order).filter_by(id=order_id).first()

        if not order:
            return jsonify({'error': 'Order not found'}), 404
        
        # Esegui l'eliminazione dell'ordine
        db.delete(order)
        db.commit()

        return jsonify({'message': 'Order deleted successfully'}), 200
