# thai-clean-air - Hack To The Rescue

Web page created for Challenge no. 4 during Hack To The Rescue hackaton (https://hacktotherescue.org/)

## Run

### Retrieve code
   `git clone git@github.com:rgatkowski/thai-clean-air.git`

### Setup environment file
### Backend
   Copy `example.backend.env` to `.env`...
   ```shell
   cp example.backend.env .env
   ```
   
...and adjust required values in the `.env` file:
* `AWS_REGION` - AWS region, default: `us-east-1`
* `AWS_ACCESS_KEY` - AWS Access Key ID 
* `AWS_SECRET_ACCESS_KEY` - AWS Secret Access Key

#### Frontend
   Copy `example.frontend.env` to `.env.local` in `./frontend` directory...

   ...and add api secret:
* `NEXT_PUBLIC_API_KEY=`

   
### Run project
   `docker-compose up`

### Enjoy
`http://localhost:3000`

## Testing
### Backend
Easiest - via Docker:
```shell
docker-compose up
docker exec -it thai-clean-air_backend_1 bash
# inside docker:
python -m pytest
```

### Install frontend dependencies
   If you want to run it not in a docker
   run `yarn` in the `./frontend` directory




## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
