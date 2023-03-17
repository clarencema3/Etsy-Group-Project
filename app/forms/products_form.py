from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, TextAreaField
from wtforms.validators import DataRequired


class ProductForm(FlaskForm):
    product_name = StringField('Product Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    price = FloatField('Price', validators=[DataRequired()])
    stock = IntegerField('Stock', validators=[DataRequired()])
    preview_img = StringField('Preview Image', validators=[DataRequired()])
