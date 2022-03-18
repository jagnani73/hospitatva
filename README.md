# Hospitatva - SIH 2022

## Public API

### Create Invoice from Prescription

A hospital can integrate our public API into their private prescription/invoicing systems to generate an estimated expenses summary from the doctor's prescription on our Hospitatva ecosystem.

**URL** : `/api/invoice/`

**Method** : `POST`

**Auth required** : YES (Hospital Administrator)

## Request Signature

```json
{
	"signedHash": "65SD4FSDF49.FSFE5HRRTHJ45G4R4HE2F1SD5.G40SHJK13",
	"patient": {
		"name": "Snehil",
		"age": 22,
		"sex": "Male",
		"address": "Estancia 1234, Chennai, TN, India",
		"contact": "+919999999999"
	},
	"doctor": {
		"name": "Dr. Yashvardhan Jagnani",
		"speciality": "Cardiologist",
		"contact": "+9999999999"
	},
	"hospital": {
		"name": "Apaulo Hospital",
		"address": "12/24, Abode, SRMIST"
	},
	"consultationDate": "19/03/2022",
	"items": [
		{
			"name": "<commodity name>",
			"quanity": 99,
			"cost": 999
		},
		{
			"name": "<commodity name 2>",
			"quanity": 88,
			"cost": 888
		}
	]
}
```

## Success Response

**Code** : `200 OK`

```json
{
	"id": "ABCD1234",
	"url": "https://hospitatva.vercel.app/summary/ABCD1234"
}
```
