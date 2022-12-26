import PublitioAPI from "publitio_js_sdk";
const publitio = new PublitioAPI(
	"XzlfpaVeuZWdTwWdjywA",
	"fl4vfPsLrpwRM8h1erjLZ9v52ySsJzoP"
);

export const uploadImagePublitio = async ({
	folder,
	title,
	publicId,
	file,
}: any) => {
	try {
		const response = await publitio
			.uploadFile(file, "file", {
				folder: folder,
				title: title,
				public_id: publicId,
			})
			.then(async (response) => {
				if (response.success) {
					await publitio.call(`/files/versions/create/${response.id}`, "POST", {
						extension: "webp",
						options: "w_300",
					});

					return response;
				} else {
					return response.error;
				}
			})
			.catch((error) => {
				console.log(error);
			});
		return response;
	} catch (error: any) {
		console.log(error);
	}
};

export const deleteImagePublitio = async (imageId: any) => {
	try {
		// Delete file with id
		const response = publitio
			.call(`/files/delete/${imageId}`, "DELETE")
			.then((response) => {
				if (response.success) {
					return response;
				} else {
					return response.error;
				}
			})
			.catch((error) => {
				console.log(error);
			});

		return response;
	} catch (error: any) {
		console.log(error);
	}
};
