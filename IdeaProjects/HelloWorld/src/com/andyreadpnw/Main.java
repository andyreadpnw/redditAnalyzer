package com.andyreadpnw;

import java.util.Arrays;

public class Main {

    static int removeDuplicates(int binaryArray[], int n)
    {
      int[] temp = new int[n];

      int j = 0;
      for (int i = 0; i<n-1;i++)
          if (binaryArray[i] != binaryArray[i+1])
              temp[j++] = binaryArray[i];

          temp[j++] = binaryArray[n-1];

          for (int i = 0; i < j; i++)
              binaryArray[i] = temp[i];

                      return j;

    }

    public static void main(String[] args) {

        int binaryArray[] = new int[1000];


        for (int i = 0; i < binaryArray.length; i++){
            binaryArray[i] = (int)(Math.random() * 10000);

        }

        Arrays.sort(binaryArray);

        int n = binaryArray.length;

        n = removeDuplicates(binaryArray, n);

        System.out.println(Arrays.toString(binaryArray));
        System.out.println(binaryArray.length);
    }
}
