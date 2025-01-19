import json
import base64
import boto3
import os

# Initialize S3 client
s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        # Parse input from the event
        file_name = event.get('file_name')
        file_content = event.get('file_content') 
        bucket_name = os.environ['BUCKET_NAME'] 

        if not file_name or not file_content:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'file_name and file_content are required.'})
            }
        
        file_data = base64.b64decode(file_content)
        s3.put_object(
            Bucket=bucket_name,
            Key=file_name,
            Body=file_data,
            ContentType='application/pdf'  
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': f'{file_name} uploaded successfully to {bucket_name}.'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
