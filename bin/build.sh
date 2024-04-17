rm build/*.*

export VERSION=0.1
export TMP_FILENAME="aita_reader_uglified_$VERSION.js"
export OUT_FILENAME="aita_reader_bookmarklet_$VERSION.js"; echo $OUT_FILENAME

yarn run uglifyjs src/aita_reader.js -O quote_style=1 -o build/$TMP_FILENAME

# Replace all instances of two consecutive spaces with a single space
tr -s ' ' < build/$TMP_FILENAME > build/tmp2.js
mv build/tmp2.js build/$TMP_FILENAME

# remove all linebreaks
tr -d '\n' < build/$TMP_FILENAME > build/tmp2.js
mv build/tmp2.js build/$TMP_FILENAME

touch build/$OUT_FILENAME
echo -n "javascript:" >> build/$OUT_FILENAME
cat build/$TMP_FILENAME >> build/$OUT_FILENAME
rm build/$TMP_FILENAME
echo "************************************************************"
echo "saved build/$OUT_FILENAME"
echo "************************************************************"

cat build/$OUT_FILENAME

cat build/$OUT_FILENAME | pbcopy
echo ""
echo ""
echo "Copied to clipboard!"