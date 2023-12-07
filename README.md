# thai-clean-air - Hack To The Rescue

Web page created for Challenge no. 4 during Hack To The Rescue hackaton (https://hacktotherescue.org/)

## Run

### Retrieve code
   `git clone git@github.com:rgatkowski/thai-clean-air.git`

### Setup environment file
   Copy `example.env` to `.env`...
   ```shell
   cp example.env .env
   ```
   
...and adjust required values in the `.env` file:
* `AWS_REGION` - AWS region, default: `us-east-1`
* `AWS_ACCESS_KEY` - AWS Access Key ID 
* `AWS_SECRET_ACCESS_KEY` - AWS Secret Access Key

   
### Run project
   `docker-compose up`

## Testing
### Backend
Easiest - via Docker:
```shell
docker-compose up
docker exec -it thai-clean-air_backend_1 bash
# inside docker:
python -m pytest
```

### Enjoy
`http://localhost:8000`


## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
