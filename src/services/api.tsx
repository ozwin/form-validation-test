export const handlePostMethod = async (payload: any) => {

    try {
        const response = await fetch('https://fullstack-test-navy.vercel.app/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add other headers as needed
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error during API call:', error.message);
    }
};
