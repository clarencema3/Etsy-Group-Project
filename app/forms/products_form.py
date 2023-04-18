from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms import StringField, IntegerField, FloatField, TextAreaField,URLField
from wtforms.validators import DataRequired, URL, NumberRange, Length


class ProductForm(FlaskForm):
    product_name = StringField('Product Name', validators=[DataRequired(message='Name is required')])
    description = TextAreaField('Description', validators=[DataRequired(message='Description is required'), Length(min=5, max=3000, message='Description must be between 5 and 3000 characters.')])
    price = FloatField('Price', validators=[DataRequired(), NumberRange(min=1, message="Price cannot be 0 or negative")])
    stock = IntegerField('Stock', validators=[DataRequired(), NumberRange(min=1, message="Price cannot be 0 or negative")])
    preview_img = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
