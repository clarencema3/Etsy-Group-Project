from app.models import db, Product, SCHEMA, environment
from sqlalchemy.sql import text
import random


def seed_products():
    imgList = [
        "https://i.etsystatic.com/15257668/r/il/423221/3831212605/il_fullxfull.3831212605_h90q.jpg",
        "https://i.etsystatic.com/23032371/r/il/2cf2ca/4337929119/il_fullxfull.4337929119_si67.jpg",
        "https://i.etsystatic.com/19375526/r/il/4ca639/2608081267/il_794xN.2608081267_428r.jpg",
        "https://i.etsystatic.com/23032371/r/il/aba60a/3036217547/il_570xN.3036217547_htvy.jpg",
        "https://i.etsystatic.com/19375526/r/il/0a8587/2608059373/il_794xN.2608059373_6fvq.jpg",
        "https://i.etsystatic.com/19375526/r/il/cf65d6/2535530490/il_794xN.2535530490_rez8.jpg",
        "https://i.etsystatic.com/19375526/r/il/df4ecc/3937433556/il_794xN.3937433556_8ge0.jpg",
        "https://i.etsystatic.com/23323937/r/il/f092c2/3880435050/il_794xN.3880435050_reyt.jpg",
        "https://i.etsystatic.com/23323937/r/il/e66376/2923142221/il_794xN.2923142221_t0dn.jpg",
        "https://i.etsystatic.com/23323937/r/il/d64003/2923142579/il_794xN.2923142579_gmhh.jpg",
        "https://i.etsystatic.com/23323937/r/il/3e6662/2875458390/il_794xN.2875458390_mow8.jpg",
        "https://i.etsystatic.com/23323937/r/il/9f9f4a/3768152950/il_794xN.3768152950_pte7.jpg",
        "https://i.etsystatic.com/23323937/r/il/a5e060/3815754699/il_794xN.3815754699_3vyj.jpg",
        "https://i.etsystatic.com/23323937/r/il/47565b/3768152736/il_794xN.3768152736_h3xm.jpg",
        "https://i.etsystatic.com/23323937/r/il/2a4b6e/3768152726/il_794xN.3768152726_fyq9.jpg",
        "https://i.etsystatic.com/23323937/r/il/e1213f/3768152714/il_794xN.3768152714_6bb1.jpg",
        "https://i.etsystatic.com/23323937/r/il/d715be/3815754523/il_794xN.3815754523_3xei.jpg",
        "https://i.etsystatic.com/23323937/r/il/dfc91a/3815740017/il_794xN.3815740017_hq85.jpg",
        "https://i.etsystatic.com/23323937/r/il/0b151b/3815740025/il_794xN.3815740025_1f6u.jpg",
        "https://i.etsystatic.com/23323937/r/il/bc0048/3768147842/il_794xN.3768147842_e0zl.jpg",
    ]
    productList = []
    for idx, link in enumerate(imgList):
        product = Product(
            product_name=f'Pet Portrait',
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            price=15.05+idx,
            seller_id=random.randint(1,2),
            stock=random.randint(5,20),
            preview_img=link,
        )
        productList.append(product)


    db.session.add_all(productList)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
