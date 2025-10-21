const str1 = "abbbcdeefi"
/*
1. find unique sequence (count)
2. find duplicate sequence (count)
3. if (unique seq / duplicate seq < 1) return empty string
4.  else replace the sequence with unique char
*/

function makeUniqueSeq(str) {
    let dupSeq = 0;
    let uniqueSeq = 0;

    for(let i = 0; i < str.length; i++) {
        const char = str[i];
        const nextChar = str[i+1]

        if(char === nextChar) {
            dupSeq++
        } else {
            uniqueSeq++
        }

        if((uniqueSeq / dupSeq) < 1) {
            return " "
        }


    }
}