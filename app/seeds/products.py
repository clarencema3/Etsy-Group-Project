from app.models import db, Product, SCHEMA, environment
from sqlalchemy.sql import text


def seed_products():
    product1 = Product(
        product_name="Mushroom Tea Mug",
        description="Gift our You Got This stoneware coffee mug to your best friend or favorite coworker. The motivational coffee mug makes the perfect graduation gift, housewarming gift or even new job gift for encouragement. Our You Got This coffee mug not only has an inspirational quote, but it has a beautiful modern look that will compliment and elevate your home (or office) decor. It's microwave and dishwasher safe, too!",
        price=15.00,
        seller_id=1,
        stock=1,
        preview_img="https://i.etsystatic.com/25260451/r/il/402e7c/4387266595/il_794xN.4387266595_dh89.jpg",
    )

    product2 = Product(
        product_name="Inspiriational Quote Mug",
        description="Gift our You Got This stoneware coffee mug to your best friend or favorite coworker. The motivational coffee mug makes the perfect graduation gift, housewarming gift or even new job gift for encouragement. Our You Got This coffee mug not only has an inspirational quote, but it has a beautiful modern look that will compliment and elevate your home (or office) decor. It's microwave and dishwasher safe, too!",
        price=20.00,
        seller_id=1,
        stock=3,
        preview_img="https://i.etsystatic.com/10385964/r/il/2effab/3655026551/il_794xN.3655026551_mti6.jpg",
    )

    product3 = Product(
        product_name="Smiley Face T-shirts",
        description="This is a one of a kind embroidered shirt that your gonna absolutely love. This is the perfect gift!",
        price=35.55,
        seller_id=1,
        stock=5,
        preview_img="https://i.etsystatic.com/19102668/r/il/f425a0/4063800176/il_794xN.4063800176_6bz5.jpg",
    )

    product4 = Product(
        product_name="Silly Goose University Crewneck Sweatshirt",
        description="Silly Goose University Crewneck Sweatshirt, Unisex Silly Goose University Shirt, Funny Men's Sweatshirt, Funny Gift for Guys, Funny Goose",
        price=40.00,
        seller_id=1,
        stock=7,
        preview_img="https://i.etsystatic.com/38532681/r/il/a163fe/4516470801/il_794xN.4516470801_93zh.jpg",
    )

    product5 = Product(
        product_name="Tiny Birth Flower Necklace, Wild Flowers Memorial",
        description="We have reflected elegance and quality to our products that we produce with passion. We manufacture our products on order with the basic principle of customer satisfaction. We manufacture our products from 18K gold filled 925 sterling silver.",
        price=84.50,
        seller_id=2,
        stock=2,
        preview_img="https://i.etsystatic.com/25085977/r/il/db00ea/4215941337/il_794xN.4215941337_khf8.jpg",
    )

    product6 = Product(
        product_name="Family Necklace • Personalized Gift • Linked Circle Necklace",
        description="Material: High Quality Solid 925 Sterling Silver. Dimension: 13mm Outer Diameter. Finish: Sterling Silver ∙ 18K Gold ∙ Rose Gold. Personalized: This design can be customized with your Roman Numerals, Messages, Coordinates or Names. All our work is custom made by hand with Love and Care in our workshop ",
        price=67.00,
        seller_id=2,
        stock=7,
        preview_img="https://i.etsystatic.com/10204022/r/il/fb2b79/1130332425/il_794xN.1130332425_rvw1.jpg",
    )

    all_products = [product1, product2, product3, product4, product5, product6]
    add_products = [db.session.add(product) for product in all_products]
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
