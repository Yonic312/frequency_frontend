export const registerUser = async (userData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
};

// Vite 프로젝트에서는 .env 파일의 변수는 import.meta.env를 통해 가져올 수 있습니다.
// import.meta.env.VITE_API_URL을 사용하면 http://localhost:8080이 자동으로 적용됩니다.
// 즉, API 주소를 하드코딩할 필요 없이 환경 변수에서 불러올 수 있습니다