export class DecimalUtils {

    public static StringParaDecimal(input): any {
        if (input === null) return 0;

        input = input.replace(/\./g, '');
        input = input.replace(/,/g, '.');
        return parseFloat(input);
    }

    public static DecimalParaString(input): any {
        var ret = (input) ? input.toString().replace('.', ',') : null;
        if (ret) {
            var decArr = ret.split(',');
            if (decArr.length > 1) {
                var dec = decArr[1].length;
                if (dec === 1) { ret += '0'; }
            }
        }
        return ret;
    }
}

// 532,54 --> 532.54
// 566.12 --> 56612
// 1.923,42 --> 1.923.42
// 1942.12 --> 194212
// 100.2 -->  1002