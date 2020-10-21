import React from "react";
import { IonLoading, IonTitle, IonListHeader } from "@ionic/react";

export default function Categories({ history }) {
  return (
    <>
      <div className="tw-flex tw-justify-center tw-gap-5 tw-overflow-x-auto tw-hidden lg:tw-flex tw-max-w-screen-xl  tw-mx-auto">
        <div class="tw-py-3 tw-text-center tw-focus:outline-none tw-border-8 tw-border-white tw-px-1">
          <div
            onClick={(e) => history.push("/search/onion")}
            class="  tw-h-auto -tw-pb-8 tw-w-full  tw-py-1  tw-mx-auto tw-text-gray-900 tw-hover:bg-green-500 tw-border-2 tw-border-transparent tw-hover:text-white    tw-hover:shadow-lg"
          >
            <svg
              class=" hover:tw-bg-gray-300 tw-bg-gray-100 tw-shadow-sm tw-p-3  tw-text-gray-700 tw-hover:text-white tw-mx-auto  "
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid"
              fill="currentColor"
              width="60"
              height="59.91"
              viewBox="0 0 60 59.91"
            >
              <path
                d="M47.060,59.894 C43.018,59.894 41.641,59.053 40.635,58.438 C40.066,58.091 39.754,57.900 39.000,57.900 C38.143,57.900 37.615,58.148 36.815,58.523 C35.790,59.004 34.514,59.602 32.118,59.887 C32.078,59.892 32.038,59.894 31.999,59.894 C31.499,59.894 31.067,59.521 31.007,59.014 C30.941,58.466 31.333,57.970 31.882,57.905 C33.956,57.659 35.023,57.159 35.965,56.716 C36.855,56.299 37.696,55.904 39.000,55.904 C40.317,55.904 41.010,56.328 41.679,56.737 C42.526,57.254 43.581,57.898 47.060,57.898 C52.132,57.898 58.000,45.321 58.000,37.115 C58.000,29.375 54.228,23.972 48.825,23.972 C46.986,23.972 45.849,24.804 44.531,25.767 C43.123,26.795 41.527,27.963 39.000,27.963 C36.452,27.963 34.960,26.738 33.645,25.657 C32.747,24.921 31.900,24.227 30.758,23.942 C30.222,23.809 29.896,23.266 30.029,22.732 C30.164,22.197 30.706,21.876 31.242,22.005 C32.822,22.399 33.934,23.312 34.915,24.116 C35.896,24.923 36.776,25.630 38.049,25.872 C38.539,19.173 43.412,17.144 43.630,17.058 C44.142,16.852 44.725,17.103 44.929,17.615 C45.133,18.126 44.885,18.705 44.374,18.910 C44.186,18.988 40.512,20.578 40.048,25.847 C41.333,25.598 42.292,24.930 43.350,24.156 C44.748,23.134 46.332,21.976 48.825,21.976 C55.404,21.976 60.000,28.201 60.000,37.115 C60.000,45.697 53.952,59.894 47.060,59.894 ZM16.000,59.894 C7.178,59.894 0.000,52.235 0.000,42.821 C0.000,38.512 2.338,33.513 4.599,28.678 C5.559,26.626 6.465,24.687 7.188,22.827 C8.594,19.220 8.999,15.856 9.003,15.823 C9.032,13.992 10.367,10.472 15.038,10.045 C15.426,2.274 20.409,0.182 20.630,0.094 C21.146,-0.111 21.726,0.140 21.929,0.651 C22.133,1.162 21.885,1.739 21.376,1.946 C21.195,2.021 17.387,3.702 17.035,10.055 C21.603,10.515 22.944,14.003 22.997,15.910 L22.997,15.909 C23.001,15.909 23.411,19.248 24.805,22.826 C25.526,24.679 26.432,26.612 27.389,28.657 C29.656,33.499 32.000,38.506 32.000,42.821 C32.000,52.235 24.822,59.894 16.000,59.894 ZM25.577,29.502 C24.647,27.517 23.686,25.466 22.940,23.550 C21.439,19.693 21.021,16.201 21.004,16.053 C20.981,15.564 20.702,11.998 16.000,11.998 C11.126,11.998 10.999,15.794 10.996,15.957 C10.973,16.199 10.555,19.693 9.052,23.550 C8.306,25.471 7.343,27.530 6.411,29.521 C4.242,34.159 2.000,38.954 2.000,42.821 C2.000,51.135 8.280,57.898 16.000,57.898 C23.720,57.898 30.000,51.135 30.000,42.821 C30.000,38.950 27.751,34.146 25.577,29.502 Z"
                class="cls-1"
              />
            </svg>
          </div>
          <span class="tw-text-gray-700 tw-font-semibold tw-text-sm lg:tw-text-md hover:tw-text-teal-700 tw-text-gray-700">
            Onions
          </span>
        </div>

        <div class="tw-py-3 tw-text-center tw-focus:outline-none tw-border-8 tw-border-white tw-px-1">
          <div
            onClick={(e) => history.push("/search/tomatoes")}
            class="  tw-h-auto -pb-8 tw-w-full  tw-py-1  tw-mx-auto tw-text-gray-900  tw-hover:bg-green-500 tw-border-2 tw-border-transparent tw-hover:text-white    tw-hover:shadow-lg"
          >
            <svg
              class=" hover:tw-bg-gray-300 tw-bg-gray-100 tw-shadow-sm tw-p-3  tw-text-gray-700 tw-hover:text-white tw-mx-auto  "
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid"
              fill="currentColor"
              width="56"
              height="60"
              viewBox="0 0 56 60"
            >
              <path
                d="M56.000,23.609 C56.000,24.553 55.566,25.105 55.203,25.402 C54.719,25.798 54.044,26.000 53.198,26.000 C52.995,26.000 52.781,25.959 52.572,25.936 C53.632,28.884 54.199,31.973 54.199,35.162 C54.199,46.064 47.843,55.783 38.005,59.921 C37.881,59.973 37.750,59.999 37.617,59.999 L18.516,59.999 C18.383,59.999 18.251,59.973 18.128,59.921 C8.289,55.782 1.932,46.064 1.932,35.162 C1.932,31.967 2.499,28.873 3.559,25.923 C3.305,25.955 3.048,26.000 2.803,26.000 C1.957,26.000 1.281,25.798 0.797,25.402 C0.434,25.105 0.000,24.552 0.000,23.609 C0.000,20.358 6.219,13.422 12.373,10.000 L12.066,10.000 C11.758,10.000 11.467,9.858 11.278,9.615 C11.088,9.373 11.021,9.056 11.096,8.758 L13.096,0.757 C13.207,0.312 13.607,-0.001 14.066,-0.001 L42.066,-0.001 C42.525,-0.001 42.925,0.312 43.036,0.757 L44.990,8.571 C45.052,8.701 45.086,8.846 45.086,9.000 C45.086,9.552 44.638,10.000 44.086,10.000 C44.081,9.999 44.073,9.999 44.066,10.000 L43.627,10.000 C49.781,13.422 56.000,20.358 56.000,23.609 ZM18.720,58.000 L37.413,58.000 C46.402,54.130 52.199,45.188 52.199,35.162 C52.199,31.738 51.516,28.434 50.202,25.325 C47.755,24.366 45.111,22.532 42.689,20.836 C40.871,19.563 38.621,17.987 37.757,17.893 C37.426,18.056 36.629,18.807 35.983,19.414 C33.933,21.340 31.126,23.979 28.066,23.979 C24.982,23.979 22.134,21.342 20.054,19.416 C19.395,18.807 18.580,18.052 18.246,17.892 C17.385,17.983 15.130,19.563 13.309,20.837 C10.937,22.498 8.352,24.291 5.948,25.264 C4.620,28.390 3.932,31.714 3.932,35.162 C3.932,45.188 9.730,54.130 18.720,58.000 ZM41.285,2.000 L14.847,2.000 L13.347,8.000 L42.785,8.000 L41.285,2.000 ZM37.368,10.000 L18.631,10.000 C12.312,10.000 2.000,20.511 2.000,23.609 C2.000,23.738 2.022,23.820 2.063,23.855 C2.093,23.878 2.269,23.999 2.803,23.999 C5.306,23.999 9.108,21.338 12.161,19.198 C15.181,17.085 16.956,15.888 18.320,15.888 C19.187,15.888 20.025,16.664 21.414,17.950 C23.249,19.650 25.765,21.979 28.066,21.979 C30.334,21.979 32.806,19.654 34.613,17.955 C35.984,16.667 36.812,15.888 37.680,15.888 C39.044,15.888 40.818,17.085 43.837,19.198 C46.891,21.338 50.693,23.999 53.198,23.999 C53.732,23.999 53.908,23.878 53.938,23.855 C53.978,23.820 54.000,23.738 54.000,23.609 C54.000,20.512 43.688,10.000 37.368,10.000 ZM27.999,43.000 C30.756,43.000 33.000,45.243 33.000,47.999 C33.000,50.756 30.756,53.000 27.999,53.000 C25.243,53.000 22.999,50.756 22.999,47.999 C22.999,45.243 25.243,43.000 27.999,43.000 ZM27.999,50.999 C29.654,50.999 31.000,49.654 31.000,47.999 C31.000,46.345 29.654,45.000 27.999,45.000 C26.345,45.000 24.999,46.345 24.999,47.999 C24.999,49.654 26.345,50.999 27.999,50.999 ZM38.000,32.999 C40.757,32.999 43.000,35.243 43.000,38.000 C43.000,40.756 40.757,43.000 38.000,43.000 C35.243,43.000 33.000,40.756 33.000,38.000 C33.000,35.243 35.243,32.999 38.000,32.999 ZM38.000,40.999 C39.654,40.999 41.000,39.654 41.000,38.000 C41.000,36.345 39.654,35.000 38.000,35.000 C36.345,35.000 35.000,36.345 35.000,38.000 C35.000,39.654 36.345,40.999 38.000,40.999 Z"
                class="cls-1"
              />
            </svg>
          </div>
          <span class="tw-text-gray-700 tw-font-semibold tw-text-sm lg:tw-text-md hover:tw-text-teal-700">
            Tomatoes
          </span>
        </div>
        <div class="tw-py-3 tw-text-center tw-focus:outline-none tw-border-8 tw-border-white tw-px-1">
          <div
            onClick={(e) => history.push("/search/pepper")}
            class="  tw-h-auto -pb-8 tw-w-full  tw-py-1  tw-mx-auto tw-text-gray-900  tw-hover:bg-green-500 tw-border-2 tw-border-transparent tw-hover:text-white    tw-hover:shadow-lg"
          >
            <svg
              class=" hover:tw-bg-gray-300 tw-bg-gray-100 tw-shadow-sm tw-p-3  tw-text-gray-700 tw-hover:text-white tw-mx-auto  "
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid"
              fill="currentColor"
              width="59.91"
              height="60"
              viewBox="0 0 59.91 60"
            >
              <path
                d="M58.912,1.999 C55.226,1.999 52.504,2.956 50.821,4.839 C49.110,6.757 48.895,9.199 48.894,10.300 C54.055,11.439 57.913,15.788 57.913,20.976 C57.913,23.069 57.546,25.653 56.724,28.470 C56.713,28.523 56.700,28.573 56.681,28.624 C55.184,33.665 52.214,39.441 47.162,44.539 C36.998,54.797 21.461,59.999 0.982,59.999 C0.508,59.999 0.099,59.666 0.004,59.201 C-0.092,58.737 0.152,58.268 0.587,58.081 C19.671,49.847 31.716,36.691 34.503,21.034 L34.546,20.797 C34.565,20.695 34.592,20.591 34.613,20.489 C34.616,20.468 34.622,20.450 34.626,20.430 C35.690,15.337 39.703,9.999 46.222,9.999 C46.450,9.999 46.673,10.019 46.898,10.031 C46.932,8.543 47.298,5.800 49.313,3.528 C51.390,1.187 54.619,-0.001 58.912,-0.001 C59.464,-0.001 59.911,0.446 59.911,0.999 C59.911,1.552 59.464,1.999 58.912,1.999 ZM5.723,57.901 C23.310,57.157 36.760,52.198 45.744,43.131 C50.428,38.403 53.226,33.087 54.668,28.424 C49.786,20.058 39.146,21.090 36.443,21.509 C33.717,36.560 22.880,49.350 5.723,57.901 ZM46.222,11.999 C41.368,11.999 38.219,15.504 36.947,19.426 C40.643,18.991 49.995,18.705 55.353,25.808 C55.738,24.020 55.915,22.379 55.915,20.976 C55.915,16.027 51.567,11.999 46.222,11.999 Z"
                class="cls-1"
              />
            </svg>
          </div>
          <span class="tw-text-gray-700 tw-font-semibold tw-text-sm lg:tw-text-md hover:tw-text-teal-700">
            Peppers
          </span>
        </div>

        <div class="tw-py-3 tw-text-center tw-focus:outline-none tw-border-8 tw-border-white tw-px-1">
          <div
            onClick={(e) => history.push("/search/apple")}
            class="  tw-h-auto -pb-8 tw-w-full  tw-py-1  tw-mx-auto tw-text-gray-900  tw-hover:bg-green-500 tw-border-2 tw-border-transparent tw-hover:text-white    tw-hover:shadow-lg"
          >
            <svg
              class=" hover:tw-bg-gray-300 tw-bg-gray-100 tw-shadow-sm tw-p-3  tw-text-gray-700 tw-hover:text-white tw-mx-auto  "
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid"
              fill="currentColor"
              width="60"
              height="59.88"
              viewBox="0 0 60 59.88"
            >
              <path
                d="M41.601,59.870 C35.752,59.870 33.839,58.216 32.443,57.007 C31.630,56.304 31.138,55.879 30.000,55.879 C28.861,55.879 28.370,56.304 27.556,57.007 C26.161,58.216 24.248,59.870 18.399,59.870 C8.599,59.870 -0.000,40.392 -0.000,28.618 C-0.000,16.657 6.655,7.974 15.825,7.974 C19.272,7.974 21.374,9.318 23.407,10.617 C25.068,11.677 26.648,12.685 28.984,12.914 C28.811,3.691 23.749,1.956 23.697,1.940 C23.171,1.773 22.880,1.212 23.047,0.686 C23.214,0.162 23.773,-0.133 24.303,0.037 C24.572,0.122 30.799,2.244 30.983,12.916 C33.335,12.692 34.923,11.682 36.589,10.617 C38.622,9.318 40.723,7.974 44.175,7.974 C53.345,7.974 60.000,16.657 60.000,28.618 C60.000,40.392 51.400,59.870 41.601,59.870 ZM44.175,9.971 C41.309,9.971 39.540,11.101 37.667,12.298 C35.619,13.607 33.501,14.960 30.000,14.960 C26.498,14.960 24.379,13.607 22.329,12.297 C20.456,11.101 18.686,9.971 15.825,9.971 C7.685,9.971 2.000,17.638 2.000,28.618 C2.000,39.364 10.103,57.875 18.399,57.875 C23.502,57.875 24.960,56.612 26.247,55.500 C27.165,54.704 28.115,53.883 30.000,53.883 C31.885,53.883 32.835,54.704 33.753,55.500 C35.040,56.612 36.498,57.875 41.601,57.875 C49.896,57.875 58.000,39.364 58.000,28.618 C58.000,17.638 52.314,9.971 44.175,9.971 ZM36.000,36.916 C35.447,36.916 35.000,36.471 35.000,35.918 L35.000,27.935 C35.000,27.382 35.447,26.937 36.000,26.937 C36.553,26.937 37.000,27.382 37.000,27.935 L37.000,35.918 C37.000,36.471 36.553,36.916 36.000,36.916 ZM24.000,36.916 C23.447,36.916 23.000,36.471 23.000,35.918 L23.000,27.935 C23.000,27.382 23.447,26.937 24.000,26.937 C24.553,26.937 25.000,27.382 25.000,27.935 L25.000,35.918 C25.000,36.471 24.553,36.916 24.000,36.916 Z"
                class="cls-1"
              />
            </svg>
          </div>
          <span class="tw-text-gray-700 tw-font-semibold tw-text-sm lg:tw-text-md hover:tw-text-teal-700">
            Apples
          </span>
        </div>
        <div class="tw-py-3 tw-text-center tw-focus:outline-none tw-border-8 tw-border-white tw-px-1">
          <div
            onClick={(e) => history.push("/search/mushroom")}
            class="  tw-h-auto -pb-8 tw-w-full  tw-py-1  tw-mx-auto tw-text-gray-900  tw-hover:bg-green-500 tw-border-2 tw-border-transparent tw-hover:text-white    tw-hover:shadow-lg"
          >
            <svg
              class=" hover:tw-bg-gray-300 tw-bg-gray-100 tw-shadow-sm tw-p-3  tw-text-gray-700 tw-hover:text-white tw-mx-auto  "
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid"
              fill="currentColor"
              width="60"
              height="60"
              viewBox="0 0 60 60"
            >
              <path
                d="M38.228,35.482 C40.497,39.503 41.019,45.054 41.019,49.179 C41.019,55.247 36.180,59.998 30.002,59.998 C23.825,59.998 18.986,55.247 18.986,49.179 C18.986,45.049 19.507,39.495 21.772,35.482 C9.501,33.931 0.002,29.073 0.002,23.665 C0.002,10.615 13.460,-0.001 30.002,-0.001 C46.543,-0.001 59.999,10.615 59.999,23.665 C59.999,29.073 50.499,33.932 38.228,35.482 ZM20.989,49.179 C20.989,54.125 24.948,57.999 30.002,57.999 C35.057,57.999 39.016,54.125 39.016,49.179 C39.016,45.778 38.620,39.552 36.047,35.722 C34.081,35.902 32.059,35.999 30.002,35.999 C27.945,35.999 25.922,35.902 23.955,35.722 C21.385,39.541 20.989,45.774 20.989,49.179 ZM30.002,1.999 C14.565,1.999 2.005,11.719 2.005,23.665 C2.005,28.444 14.234,34.000 30.002,34.000 C45.768,34.000 57.996,28.444 57.996,23.665 C57.996,11.719 45.438,1.999 30.002,1.999 Z"
                class="cls-1"
              />
            </svg>
          </div>
          <span class="tw-text-gray-700 tw-font-semibold tw-text-sm lg:tw-text-md hover:tw-text-teal-700">
            Mushrooms
          </span>
        </div>
        <div class="tw-py-3 tw-text-center tw-focus:outline-none tw-border-8 tw-border-white tw-px-1">
          <div
            onClick={(e) => history.push("/search/egg")}
            class="  tw-h-auto -pb-8 tw-w-full  tw-py-1  tw-mx-auto tw-text-gray-900  tw-hover:bg-green-500 tw-border-2 tw-border-transparent tw-hover:text-white    tw-hover:shadow-lg"
          >
            <svg
              class=" hover:tw-bg-gray-300 tw-bg-gray-100 tw-shadow-sm tw-p-3  tw-text-gray-700 tw-hover:text-white tw-mx-auto  "
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid"
              fill="currentColor"
              width="59"
              height="60"
              viewBox="0 0 44 60"
            >
              <path
                d="M22.000,59.999 C9.458,59.999 -0.000,47.933 -0.000,31.932 C-0.000,14.735 12.097,-0.001 22.000,-0.001 C31.903,-0.001 44.000,14.735 44.000,31.932 C44.000,47.933 34.542,59.999 22.000,59.999 ZM22.000,1.999 C13.184,1.999 2.000,16.093 2.000,31.932 C2.000,46.792 10.598,57.999 22.000,57.999 C33.402,57.999 42.000,46.792 42.000,31.932 C42.000,16.093 30.815,1.999 22.000,1.999 Z"
                class="cls-1"
              />
            </svg>
          </div>
          <span class="tw-text-gray-700 tw-font-semibold tw-text-sm lg:tw-text-md hover:tw-text-teal-700">
            Fresh Eggs
          </span>
        </div>
        <div class="tw-py-3 tw-text-center tw-focus:outline-none tw-border-8 tw-border-white tw-px-1">
          <div
            onClick={(e) => history.push("/search/lemon")}
            class="  tw-h-auto -pb-8 tw-w-full  tw-py-1  tw-mx-auto tw-text-gray-900  tw-hover:bg-green-500 tw-border-2 tw-border-transparent tw-hover:text-white    tw-hover:shadow-lg"
          >
            <svg
              class=" hover:tw-bg-gray-300 tw-bg-gray-100 tw-shadow-sm tw-p-3  tw-text-gray-700 tw-hover:text-white tw-mx-auto  "
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid"
              fill="currentColor"
              width="59.85"
              height="60.12"
              viewBox="0 0 59.85 60.12"
            >
              <path
                d="M58.319,11.039 C59.173,13.834 64.288,33.106 48.621,48.847 C39.552,57.957 29.302,60.073 21.738,60.073 C16.221,60.073 12.144,58.951 10.981,58.592 C9.746,59.587 8.259,60.116 6.755,60.116 C5.017,60.116 3.279,59.451 1.955,58.122 C-0.530,55.619 -0.644,51.657 1.551,48.983 C0.552,45.580 -4.028,26.780 11.312,11.370 C26.649,-4.040 45.364,0.560 48.752,1.563 C51.416,-0.646 55.359,-0.532 57.851,1.970 C59.133,3.257 59.838,4.970 59.838,6.790 C59.838,8.361 59.286,9.833 58.319,11.039 ZM56.440,3.388 C54.572,1.513 51.533,1.515 49.667,3.388 C49.630,3.424 49.584,3.440 49.544,3.470 C49.485,3.514 49.429,3.561 49.362,3.591 C49.302,3.618 49.239,3.626 49.175,3.640 C49.114,3.654 49.056,3.674 48.992,3.676 C48.917,3.678 48.844,3.659 48.770,3.644 C48.722,3.635 48.675,3.641 48.628,3.624 C48.428,3.553 28.657,-3.224 12.723,12.787 C-3.243,28.826 3.531,48.658 3.601,48.856 C3.619,48.905 3.613,48.955 3.622,49.005 C3.636,49.077 3.655,49.147 3.653,49.220 C3.651,49.286 3.631,49.347 3.616,49.411 C3.602,49.472 3.595,49.534 3.570,49.592 C3.539,49.663 3.490,49.721 3.444,49.783 C3.416,49.821 3.401,49.865 3.367,49.899 C1.504,51.777 1.503,54.830 3.367,56.705 C5.234,58.582 8.274,58.580 10.143,56.705 C10.506,56.340 11.070,56.329 11.462,56.643 C13.297,57.233 31.991,62.714 47.210,47.430 C62.462,32.106 56.962,13.337 56.377,11.515 C56.067,11.122 56.078,10.557 56.440,10.192 C57.345,9.284 57.843,8.076 57.843,6.790 C57.843,5.505 57.345,4.297 56.440,3.388 ZM41.879,8.999 L43.875,8.999 L43.875,11.001 L41.879,11.001 L41.879,8.999 ZM37.888,16.016 L39.884,16.016 L39.884,18.019 L37.888,18.019 L37.888,16.016 ZM33.897,8.999 L35.893,8.999 L35.893,11.001 L33.897,11.001 L33.897,8.999 Z"
                class="cls-1"
              />
            </svg>
          </div>
          <span class="tw-text-gray-700 tw-font-semibold tw-text-sm lg:tw-text-md hover:tw-text-teal-700">
            Lemons
          </span>
        </div>
        <div class="tw-py-3 tw-text-center tw-focus:outline-none tw-border-8 tw-border-white tw-px-1">
          <div
            onClick={(e) => history.push("/search/carrot")}
            class="  tw-h-auto -pb-8 tw-w-full  tw-py-1  tw-mx-auto tw-text-gray-900  tw-hover:bg-green-500 tw-border-2 tw-border-transparent tw-hover:text-white    tw-hover:shadow-lg"
          >
            <svg
              class=" hover:tw-bg-gray-300 tw-bg-gray-100 tw-shadow-sm tw-p-3  tw-text-gray-700 tw-hover:text-white tw-mx-auto  "
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid"
              fill="currentColor"
              width="60.15"
              height="59.84"
              viewBox="0 0 60.15 59.84"
            >
              <path
                d="M60.047,18.654 C58.880,22.811 54.257,23.840 49.964,23.840 C47.935,23.840 45.983,23.610 44.501,23.372 C46.801,26.022 47.731,28.103 48.642,30.498 C49.731,33.358 49.087,37.507 46.146,39.220 L10.892,58.829 C9.808,59.487 8.525,59.845 7.216,59.845 C5.375,59.845 3.626,59.151 2.294,57.888 C-0.195,55.531 -0.692,51.937 1.016,49.082 L21.628,16.857 C23.002,14.452 25.681,13.441 29.082,14.116 C29.626,14.222 33.453,15.031 37.292,17.213 C36.333,13.799 35.184,7.939 37.081,3.931 C37.962,2.071 39.393,0.796 41.335,0.142 C42.244,-0.164 43.103,-0.045 43.820,0.484 C45.321,1.591 45.866,4.441 46.054,6.767 C47.418,5.033 49.432,3.060 51.721,2.733 C53.234,2.518 54.628,3.030 55.864,4.258 C57.177,5.562 57.718,7.012 57.472,8.567 C57.124,10.769 55.172,12.691 53.435,14.001 C55.702,14.189 58.426,14.727 59.576,16.171 C60.140,16.880 60.303,17.739 60.047,18.654 ZM28.692,16.069 C28.126,15.958 27.585,15.901 27.082,15.901 C25.331,15.901 24.109,16.550 23.346,17.883 L19.755,23.496 C19.928,23.585 20.083,23.669 20.264,23.762 C22.607,24.958 25.818,26.596 28.856,30.212 C29.212,30.634 29.154,31.262 28.729,31.614 C28.542,31.770 28.314,31.846 28.088,31.846 C27.800,31.846 27.515,31.724 27.317,31.488 C24.540,28.183 21.661,26.713 19.347,25.532 C19.110,25.411 18.902,25.298 18.677,25.181 L13.139,33.840 C15.637,35.192 17.966,36.768 20.373,38.775 C20.798,39.128 20.853,39.756 20.497,40.178 C20.299,40.413 20.015,40.533 19.728,40.533 C19.501,40.533 19.272,40.457 19.085,40.300 C16.744,38.348 14.487,36.825 12.062,35.524 L2.723,50.125 C1.511,52.151 1.869,54.734 3.608,56.381 C4.636,57.355 5.893,57.854 7.216,57.854 C8.157,57.854 9.078,57.597 9.881,57.111 L45.149,37.493 C47.077,36.369 47.555,33.272 46.766,31.201 C45.544,27.989 44.381,25.559 39.538,21.236 C36.097,18.162 31.101,16.542 28.692,16.069 ZM58.003,17.407 C57.051,16.209 52.862,15.819 50.180,15.913 L45.671,16.083 L49.684,14.033 C51.165,13.276 55.097,10.764 55.492,8.255 C55.634,7.353 55.292,6.506 54.446,5.666 C53.670,4.895 52.868,4.583 52.006,4.704 C49.466,5.067 46.816,8.951 46.010,10.418 L43.990,14.088 L44.128,9.907 C44.217,7.185 43.810,2.957 42.624,2.083 C42.502,1.994 42.342,1.906 41.979,2.029 C40.554,2.508 39.545,3.408 38.897,4.776 C36.706,9.400 39.433,17.517 39.960,18.988 C40.272,19.233 40.579,19.488 40.879,19.755 C41.328,20.156 41.738,20.538 42.131,20.912 C42.209,20.913 42.286,20.903 42.366,20.923 C46.257,21.889 56.669,23.266 58.116,18.121 C58.219,17.748 58.123,17.557 58.003,17.407 Z"
                class="cls-1"
              />
            </svg>
          </div>
          <span class="tw-text-gray-700 tw-font-semibold tw-text-sm lg:tw-text-md hover:tw-text-teal-700">
            Carrots
          </span>
        </div>

        <div class="tw-py-3 tw-text-center tw-focus:outline-none tw-border-8 tw-border-white tw-px-1">
          <div
            onClick={(e) => history.push("/search/juice")}
            class="  tw-h-auto -pb-8 tw-w-full  tw-py-1  tw-mx-auto tw-text-gray-900  tw-hover:bg-green-500 tw-border-2 tw-border-transparent tw-hover:text-white    tw-hover:shadow-lg"
          >
            <svg
              class=" hover:tw-bg-gray-300 tw-bg-gray-100 tw-shadow-sm tw-p-3  tw-text-gray-700 tw-hover:text-white tw-mx-auto  "
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid"
              fill="currentColor"
              width="56"
              height="59.97"
              viewBox="0 0 56 59.97"
            >
              <path
                d="M56.000,27.980 C56.000,28.532 55.553,28.980 55.000,28.980 C54.447,28.980 54.000,28.532 54.000,27.980 C54.000,17.697 53.303,11.302 40.000,11.000 L40.000,14.994 C44.201,18.150 47.256,22.530 48.818,27.438 C48.924,27.596 49.000,27.775 49.000,27.980 C49.000,27.989 48.995,27.996 48.995,28.005 C49.651,30.247 50.000,32.592 50.000,34.977 C50.000,48.758 38.785,59.968 25.001,59.968 C11.216,59.968 -0.000,48.758 -0.000,34.977 C-0.000,32.592 0.349,30.248 1.005,28.005 C1.005,27.996 1.000,27.989 1.000,27.980 C1.000,27.775 1.077,27.595 1.182,27.437 C2.745,22.530 5.799,18.150 10.000,14.994 L10.000,8.574 L4.609,5.866 C4.285,5.703 4.074,5.377 4.059,5.015 C4.044,4.652 4.227,4.309 4.536,4.120 L11.044,0.138 C11.243,0.016 11.475,-0.032 11.706,-0.000 L39.140,3.866 C39.633,3.935 40.000,4.357 40.000,4.855 L40.000,9.005 C55.989,9.384 56.000,18.832 56.000,27.980 ZM2.000,34.977 C2.000,47.655 12.318,57.969 25.001,57.969 C37.683,57.969 48.000,47.655 48.000,34.977 C48.000,32.927 47.693,30.919 47.165,28.980 L2.812,28.980 C2.285,30.916 2.000,32.930 2.000,34.977 ZM38.000,5.725 L11.782,2.029 L7.114,4.886 L11.449,7.065 C11.492,7.086 11.520,7.124 11.559,7.151 C11.620,7.193 11.681,7.231 11.731,7.286 C11.774,7.332 11.801,7.386 11.834,7.439 C11.869,7.495 11.906,7.547 11.930,7.609 C11.955,7.676 11.961,7.746 11.972,7.818 C11.979,7.866 12.000,7.908 12.000,7.958 L12.000,15.766 C12.000,16.319 11.553,16.766 11.000,16.766 C10.992,16.766 10.986,16.761 10.979,16.761 C7.530,19.420 4.943,22.983 3.452,26.981 L46.536,26.981 C45.077,23.069 42.582,19.570 39.245,16.933 C39.164,16.953 39.087,16.982 39.000,16.982 C38.447,16.982 38.000,16.535 38.000,15.982 L38.000,5.725 Z"
                class="cls-1"
              />
            </svg>
          </div>
          <span class="tw-text-gray-700 tw-font-semibold tw-text-sm lg:tw-text-md hover:tw-text-teal-700">
            Pressed Juices
          </span>
        </div>
      </div>
    </>
  );
}
