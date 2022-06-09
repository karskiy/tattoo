<div id="portfolio" class="container-fluid container-md my-5">
    <?php echo '<h2 class="py-5 display-4">' . get_post_field('post_title', 71) . '</h2>'; ?>

    <div class="row">
        <?php
        $gallery = get_post_gallery_images(71);
        $gallery = array_chunk($gallery, wp_is_mobile() ? 2: 3);
        foreach ($gallery as $n => &$value) {
            print '<div id="div_'. $n .'" class="col-6 col-md-4">';
            foreach ($value as $key => $val) {
                ?>
                <img src="<?php echo esc_url($val); ?>" class="img-fluid border-0 mb-4" alt="Пример работ"/>
                <?php
            }
            print '</div>';
        }
        ?>

    </div>
</div>