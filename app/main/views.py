import datetime
import json

from flask import Blueprint, render_template
from sqlalchemy.ext.declarative import DeclarativeMeta

from app.models import EditableHTML, Flat

main = Blueprint('main', __name__)

class JsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                if isinstance(data, (datetime, datetime.date)):
                    data = datetime.isoformat(data)
                try:
                    json.dumps(data)  # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields
        return json.JSONEncoder.default(self, obj)
@main.route('/')
def index():
    flats = Flat.query.all()
    res=[]
    for f in flats:
        if f.lat is not None:
            res.append(f.to_dictionary())
    json_string = json.dumps(res, ensure_ascii=False)
    return render_template('main/index.html', flats=json_string)


@main.route('/about')
def about():
    editable_html_obj = EditableHTML.get_editable_html('about')
    return render_template(
        'main/about.html', editable_html_obj=editable_html_obj)

@main.route('/prop/<int:prop_id>')
def prop(prop_id):

    flat = Flat.query.get(prop_id)
    flat.Valid_date=datetime.datetime.strptime(flat.Valid_date, '%Y-%m-%d %H:%M:%S')
    flat.date=flat.Valid_date.day
    flat.month = flat.Valid_date.month
    flat.year = flat.Valid_date.year
    if flat.plus is None:
        flat.plus=''
    if flat.profit is None:
        flat.profit=''
    if flat.percent is None:
        flat.percent=''
    if flat.percent !='':
        flat.percent=int(flat.percent)
    if flat.market is None:
        flat.market=''
    if flat.plus is not None and flat.plus !='':
        flat.plus = int(flat.plus)


    flat=flat.to_dictionary()
    json_string = json.dumps(flat, ensure_ascii=False,default=str)
    return render_template(
        'main/property.html', property_json=json_string,property=flat)
