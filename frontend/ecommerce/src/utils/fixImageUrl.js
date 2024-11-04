const getImageURL = (image) => {
    const splitImage = image?.split("static")[1];
    return splitImage ? "https://static" + splitImage : null;
}

export default getImageURL