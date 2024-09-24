# KRX - Frontend

### 1. Login ###

- 로그인 후 -> /search 로 자동 Redirect

### 2. Sign Up ###

- Django `/auth/user` 로 request를 보내기 위해서는 4가지가 필요하다.

    ```
    {
        "email": "",
        "username": "",
        "password": "",
        "re_password": ""
    }
    ```

### 3. Stock Query ###

- Step 1

    먼저 자연어(영어)로 질문하면 회사, Ticker, 조회하고싶은 주식 가격을 추출한다.

- Step 2

    이름이 비슷한 회사들이 나열된다. 예를들어 Apple 이면 Apple Hospitality, Apple, etc 그리고 Ticker도 옆에 나열되기 때문에 정확한 회사를 선택 가능

### 4. Stock Data Search ###

- 이제 위에 정확한 데이터를 가지고 yfinance 에서 원하는 값을 불러온다
