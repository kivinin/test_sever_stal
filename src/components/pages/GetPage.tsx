import React from "react";
import axios from "axios";

type ApiResponse = {
  time: string;
  method: string;
  url: string;
  data?: object;
  response: object;
};

type GetPageProps = {
  onApiResponse: (response: ApiResponse) => void;
};

function GetPage({ onApiResponse }: GetPageProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const handleGet = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://httpbin.org/get");
      onApiResponse(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Get Page</h1>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>Error: {JSON.stringify(error)}</p>
      ) : (
        <button onClick={handleGet}>Получить тело запроса</button>
      )}
    </div>
  );
}

export default GetPage;
