import React from "react";

type ApiResponse = {
  time: string;
  method: string;
  url: string;
  data?: object;
  response: object;
};

type DeletePageProps = {
  onApiResponse: (response: ApiResponse) => void;
};

function DeletePage({ onApiResponse }: DeletePageProps) {
  const [deleteId, setDeleteId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    fetch(`https://httpbin.org/delete?id=${deleteId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) =>
        onApiResponse({
          time: new Date().toISOString(),
          method: "DELETE",
          url: `https://httpbin.org/delete?id=${deleteId}`,
          response: data,
        })
      )
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteId(event.target.value);
  };

  return (
    <div>
      <h2>Delete</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="text" name="id" onChange={handleChange} />
        </label>
        <br />
        {isLoading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p>Error: {JSON.stringify(error)}</p>
        ) : (
          <button type="submit">Получить тело запроса</button>
        )}
      </form>
    </div>
  );
}

export default DeletePage;
