
from cgi import test
from fastapi import FastAPI
from pandas import array
import uvicorn
from pydantic import BaseModel
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import TimeseriesGenerator
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import pandas as pd

new_model = tf.keras.models.load_model('my_model')
# Creating FastAPI instance
app = FastAPI()
 
# Creating class to define the request body
# and the type hints of each attribute
class request_body(BaseModel):
    #name_com : str
    data_points : list


 
# Creating an Endpoint to receive the data
# to make prediction on.

@app.post('/predict')
def predict(data : request_body):
    # Making the data in a form suitable for prediction
    test_data = data.data_points
    test_data = np.array(test_data,dtype=float)
    x = np.arange(0,3.1,0.1)
    df = pd.DataFrame(data=test_data,index=x,columns=['Pred'])
    scaler = MinMaxScaler()
    scaler.fit(df)
    #test_data = test_data.reshape(-1,1)
    test_data = scaler.transform(df)
   
    b = new_model.predict(TimeseriesGenerator(test_data, test_data, length=30, batch_size=1))
    
    b = np.round_(b,decimals=1)
    
    b = scaler.inverse_transform(b)
    
    
    print(type(float(b[0][0])))
    print(float(b[0][0]))
    # Return the Result
    b_dict = {"Pred":float(b[0][0])}
    print(b_dict)
    return b_dict