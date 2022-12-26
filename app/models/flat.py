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

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_dictionary(self):
        d = {}
        d['id'] = self.id
        d['address'] = self.address
        d['Valid_date'] = self.Valid_date
        d['priceN'] = self.priceN
        d['plus'] = self.plus
        d['price_k'] = self.price_k
        d['market'] = self.market
        d['profit'] = self.profit
        d['percent'] = self.percent
        d['comment'] = self.comment
        if hasattr(self, 'date'):
            d['date'] = self.date or 0
        if hasattr(self, 'month'):
            d['month'] = self.month or 0
        if hasattr(self, 'year'):
            d['year'] = self.year or 0
        d['lng'] =float(self.lng or 0)
        d['lat'] =float(self.lat or 0)

        return d

    def add(self):
        db.session.add(self)
        db.session.commit()









