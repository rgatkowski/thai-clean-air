import boto3
import os

from langchain.llms.bedrock import Bedrock
from langchain.prompts import PromptTemplate

from constants import BEDROCK_TEMPLATES


class BedrockService:
    model_kwargs = {
        "maxTokenCount": 1024,
        "temperature": 0.5,
        "topP": 0.5,
        "stopSequences": []
    }

    def __init__(self):
        self.model = self._get_llm()

    def _get_llm(self) -> Bedrock:
        """
        Connects to AWS and creates a Bedrock instance that we can use to communicate with the Bedrock.

        Returns:
            Bedrock: Bedrock LLM model object.
        """
        client = boto3.client(
            'bedrock-runtime',
            aws_access_key_id=os.environ.get("AWS_ACCESS_KEY"),
            aws_secret_access_key=os.environ.get("AWS_SECREET_ACCESS_KEY"),
            region_name=os.environ.get("AWS_REGION")
        )

        return Bedrock(
            client=client,
            model_id='amazon.titan-text-express-v1',
            model_kwargs=self.model_kwargs
        )

    def get_article(self, article_type: str, city: str, country: str, pm25: float) -> str:
        """
        Generate a text based on the specified article type.

        This method fetches the corresponding template for the article
        type from a pre-defined template library, formats the template,
        and uses a model to make a prediction based on that formatted
        template. The result is then returned.

        Args:
            article_type (str): The type of article to be generated.
            city (str): City name.
            country (str): Country name.
            pm25 (str): PM25 value.

        Returns:
            str: The generated article text
        """
        prompt = self._get_template(article_type)
        prompt = prompt.format(pm25=pm25, city=city, country=country)
        return self.model.predict(prompt)

    @staticmethod
    def _get_template(article_type: str) -> PromptTemplate:
        """
            Return a PromptTemplate for the specified article type.

            This method creates and returns an instance of the PromptTemplate
            class, which uses as input variables "pm25", "city", "country",
            and a default template with placeholders for these values.
            If a template for the provided article type exists in the
            `BEDROCK_TEMPLATES` dictionary, this template is used instead
            of the default one.

            Args:
                article_type (str): The type of article for which to fetch
                the template.

            Returns:
                PromptTemplate: An instance of the PromptTemplate class,
                configured with the appropriate input variables and template.
            """
        return PromptTemplate(
            input_variables=["pm25", "city", "country"],
            template=BEDROCK_TEMPLATES.get(article_type, "The current air quality in {city}, {country} is: {pn25}")
        )

