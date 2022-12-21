from .. import db

class Flat(db.Model):
    __tablename__ = 'flats'
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(64))
    Valid_date = db.Column(db.String(64))
    priceN = db.Column(db.Integer)
    plus = db.Column(db.Integer)
    price_k = db.Column(db.Integer)
    market = db.Column(db.Integer)
    profit = db.Column(db.Integer)
    percent = db.Column(db.Integer)
    comment = db.Column(db.String(64))
    lng = db.Column(db.Numeric)
    lat = db.Column(db.Numeric)


    def add(self):
        db.session.add(self)
        db.session.commit()









