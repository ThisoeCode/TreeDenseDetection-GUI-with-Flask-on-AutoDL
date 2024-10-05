import numpy as np
import scipy.io
from PIL import Image
import matplotlib.pyplot as plt

def mat2png(mat_file):
    """
    Loads a .MAT file and extracts image data to save as PNG files.

    Args:
        mat_file (str): Path to the .MAT file.

    Raises:
        FileNotFoundError: If the specified .MAT file does not exist.
        KeyError: If expected variables are not found in the .MAT file.
    """
    try:
        # Load the .MAT file
        data = scipy.io.loadmat(mat_file)

        # Extract required variables
        estimation = data['estimation']
        gt = data['gt']
        image = data['image']
        crop_preds = data['crop_preds']
        pred_map = data['pred_map']  # Fix extraction

        # Normalize and convert images to 8-bit
        estimation_image = Image.fromarray((estimation / np.max(estimation) * 255).astype(np.uint8))
        gt_image = Image.fromarray((gt / np.max(gt) * 255).astype(np.uint8))
        image_rgb = Image.fromarray((image.transpose(1, 2, 0) / np.max(image) * 255).astype(np.uint8))

        # Display images with color maps
        for img, title in zip([estimation, crop_preds, pred_map],
                              ['Model Estimation', 'Model crop_preds', 'Model pred_map']):
            if img.ndim == 3 and img.shape[0] > 1:
                img_to_show = img[0]  # Display the first slice
            else:
                img_to_show = img.squeeze()  # Handle 2D images

            plt.imshow(img_to_show, cmap='jet')
            plt.colorbar()
            plt.title(title)
            plt.axis('off')
            plt.show()

        # Save images
        estimation_image.save('estimation.png')
        gt_image.save('gt.png')
        image_rgb.save('image.png')

    except FileNotFoundError:
        print(f"Error: The file {mat_file} was not found.")
    except KeyError as e:
        print(f"Error: Missing expected data in the .MAT file: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# Example usage
# mat2png('IMG_158.mat')