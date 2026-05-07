import os
import sys
import json
import requests


def load_api_key():
    key = os.environ.get("KIE_AI_API_KEY") or os.environ.get("KIE_API_KEY")
    if key:
        return key

    script_dir = os.path.dirname(os.path.abspath(__file__))
    candidates = [
        os.path.join(script_dir, "..", ".env"),
        os.path.join(os.getcwd(), ".env"),
        os.path.join(os.path.expanduser("~"), ".env"),
    ]
    for path in candidates:
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8-sig") as f:
            for line in f:
                line = line.strip()
                if line.startswith("KIE_AI_API_KEY=") or line.startswith("KIE_API_KEY="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None


def run():
    if len(sys.argv) < 3:
        print("Usage: python get_kie_image.py <taskId> <output_file>")
        sys.exit(1)

    task_id = sys.argv[1]
    output_file = sys.argv[2]

    api_key = load_api_key()
    if not api_key:
        print("ERROR: KIE_AI_API_KEY not found. Set the env var or add it to a .env file in the current directory or your home folder.")
        sys.exit(1)

    poll_url = "https://api.kie.ai/api/v1/jobs/recordInfo"
    poll_params = {"taskId": task_id}
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }

    poll_resp = requests.get(poll_url, headers=headers, params=poll_params, timeout=15)
    poll_result = poll_resp.json()
    data = poll_result.get("data", {})
    state = data.get("state")

    if state == "success" or state == "completed":
        result_json_str = data.get("resultJson", "{}")
        try:
            result_json = json.loads(result_json_str)
        except json.JSONDecodeError:
            result_json = {}

        result_urls = result_json.get("resultUrls", [])
        if result_urls and len(result_urls) > 0:
            image_url = result_urls[0]
            print(f"Downloading image from {image_url}")
            img_resp = requests.get(image_url, timeout=30)
            os.makedirs(os.path.dirname(os.path.abspath(output_file)) or ".", exist_ok=True)
            with open(output_file, "wb") as f:
                f.write(img_resp.content)
            print(f"Successfully saved to {output_file}")
        else:
            print("No URL found")
    else:
        print(f"Task incomplete: {state}")


if __name__ == "__main__":
    run()
