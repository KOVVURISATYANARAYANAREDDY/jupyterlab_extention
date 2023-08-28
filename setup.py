#__import__('setuptools').setup()

from setuptools import setup, find_packages
from os import path

here = path.abspath(path.dirname(__file__))
with open(path.join(here, "README.md"), "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="codecompletion",
    version="0.1.0",
    url="https://github.com/yourusername/my_extension",
    author="Satya",
    author_email="your-email@example.com",
    description="A JupyterLab extension to get code completions from a local Llama-2 server.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=find_packages(),
    install_requires=[
        "jupyterlab",
    ],
    zip_safe=False,
    include_package_data=True,
    python_requires=">=3.6",
    classifiers=[
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
    ],
    entry_points={
        "jupyterlab.extensions": ["llama_code_completion = llama_code_completion:extension"],
    },
    keywords=["Hello", "World"]
)

