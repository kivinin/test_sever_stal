import React from "react";

type ApiResponse = {
  time: string;
  method: string;
  url: string;
  data?: object;
  response: object;
};

type PostPageProps = {
  onApiResponse: (response: ApiResponse) => void;
};

function PostPage({ onApiResponse }: PostPageProps) {
  const [formData, setFormData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        onApiResponse({
          time: new Date().toISOString(),
          method: "POST",
          url: "https://httpbin.org/post",
          data: formData,
          response: data,
        })
      )
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h2>Post</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" onChange={handleChange} />
          </label>
          <br />
          <button type="submit">Получить тело запроса</button>
        </form>
      )}
    </div>
  );
}

export default PostPage;
