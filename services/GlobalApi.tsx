export const RunStatus = async (Id : string)=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_INNGEST_SERVER_URL}/${Id}/runs`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_INNGEST_SIGNING_KEY}`,
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();
    return json.data;
}